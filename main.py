import cv2
import paho.mqtt.client as mqtt
import numpy as np
from gtts import gTTS
import os
import matplotlib.pyplot as plt
import time
import firebase_admin
from firebase_admin import credentials, db

# Fetch the service account key JSON file contents
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': "https://mqtt-broker-database-default-rtdb.firebaseio.com/"
})

# MQTT broker settings
broker_address = "localhost"
topic = "/test"

# Create an MQTT client
client = mqtt.Client("object_detection_client")
client.connect(broker_address)

# Get a reference to the Firebase Realtime Database
firebase_ref = db.reference('/detections')

# Load YOLO model
net = cv2.dnn.readNet("yolov3.weights", "yolov3.cfg")
with open("coco.names", "r") as f:
    classes = f.read().strip().split("\n")

# Generate random colors for each class
class_colors = np.random.randint(0, 255, size=(len(classes), 3), dtype="uint8")

# Open a video capture stream from your laptop camera (0 for default camera)
cap = cv2.VideoCapture(0)

# Initialize Matplotlib figure and axis
fig, ax = plt.subplots()

# Dictionary to store detection counts for each class
detection_counts = {"person": 0, "cell phone": 0, "laptop": 0, "book": 0, "chair": 0, "bottle": 0}

def process_detection(frame, boxes, confidences, class_ids):
    for i, (box, confidence, class_id) in enumerate(zip(boxes, confidences, class_ids)):
        x, y, w, h = box
        label = str(classes[class_id])

        if label not in ["person", "cell phone"]:
            continue

        detection_info = f"{label} - Confidence: {confidence:.2f}"
        print(detection_info)
        firebase_detection_info = {
            'label': label,
            'confidence': float(confidence),
            'timestamp': int(time.time())
        }

        # Publish detection_info to MQTT
        client.publish(topic, detection_info)
        
        # Save detection_info to Firebase
        firebase_ref.push(firebase_detection_info)

        # Update detection count for the class
        detection_counts[label] += 1

        # Assign a unique color to each class
        color = [int(c) for c in class_colors[class_id]]

        # Draw rectangle and label on the frame with class-specific color
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
        cv2.putText(frame, label, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

        if label == "cell phone":
            speech_text = "Attention, un téléphone a été détecté"
            tts = gTTS(text=speech_text, lang='fr')
            tts.save("warning.mp3")
            os.system("mpg123 warning.mp3")

    # Display the frame with object detection results
    cv2.imshow("Object Detection", frame)

    # Update and display the chart
    labels, counts = zip(*detection_counts.items())
    ax.clear()
    ax.bar(labels, counts)
    plt.xticks(rotation='vertical')
    plt.pause(0.01)

# Main loop
while True:
    ret, frame = cap.read()
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), (0, 0, 0), True, crop=False)
    net.setInput(blob)
    outs = net.forward(net.getUnconnectedOutLayersNames())

    class_ids, confidences, boxes = [], [], []
    width, height = frame.shape[1], frame.shape[0]

    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                center_x, center_y = int(detection[0] * width), int(detection[1] * height)
                w, h = int(detection[2] * width), int(detection[3] * height)
                x, y = int(center_x - w / 2), int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    filtered_boxes = [boxes[i] for i in indexes]

    process_detection(frame, filtered_boxes, [confidences[i] for i in indexes], [class_ids[i] for i in indexes])

    # Exit on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

    # Handle the closing of the chart window
    if not plt.get_fignums():
        break

# Release the camera and close OpenCV and Matplotlib windows
cap.release()
cv2.destroyAllWindows()
client.disconnect()
plt.close()