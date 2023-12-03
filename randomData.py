import random
import time

def getFakeData():
    # List of possible labels from coco.names
    possible_labels = [
        "person", "bicycle", "car", "motorbike", "aeroplane", "bus", "train", "truck", "boat",
        "traffic light", "fire hydrant", "stop sign", "parking meter", "bench", "bird", "cat",
        "dog", "horse", "sheep", "cow", "elephant", "bear", "zebra", "giraffe", "backpack",
        "umbrella", "handbag", "tie", "suitcase", "frisbee", "skis", "snowboard", "sports ball",
        "kite", "baseball bat", "baseball glove", "skateboard", "surfboard", "tennis racket",
        "bottle", "wine glass", "cup", "fork", "knife", "spoon", "bowl", "banana", "apple",
        "sandwich", "orange", "broccoli", "carrot", "hot dog", "pizza", "donut", "cake", "chair",
        "sofa", "pottedplant", "bed", "diningtable", "toilet", "tvmonitor", "laptop", "mouse",
        "remote", "keyboard", "cell phone", "microwave", "oven", "toaster", "sink", "refrigerator",
        "book", "clock", "vase", "scissors", "teddy bear", "hair drier", "toothbrush"
    ]

    # Randomly choose a label
    label = random.choice(possible_labels)

    # Generate a random confidence value between 0 and 1
    confidence = random.uniform(0, 1)

    # Generate a random timestamp within the last 24 hours (24 * 60 * 60 seconds)
    timestamp = int(time.time()) - random.randint(1, 24 * 60 * 60)

    # Create a fake detection_info dictionary
    fake_detection_info = {
        'label': label,
        'confidence': confidence,
        'timestamp': timestamp
    }

    return fake_detection_info
