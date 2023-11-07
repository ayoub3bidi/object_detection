# Detection d'object
Un mini projet pour la matière mini projet: IoT (Mastère Professionnel en Ingénierie du Logiciel - Open Source à l'ISI).

## Phase de comprendre l'utilisation de YOLO
Pour le premier phase, j'ai passé un peu de temps en experimentant avec google collab l'utilité de YOLO pour la detection des objects. Vous pouvez voir mon notebook sur Google collab [ici](https://colab.research.google.com/drive/1VSr4PVOL2Hj9FASWaUyxOUUAWA3vYCYB?usp=sharing).

## Phase de mise en place MQTT broker
Pour la deuxieme phase on va decouvrir comment connecter avec MQTT broker, pour cette phase j'ai choisi mosquitto.  
**Notes**: Nous ne pouvons pas télécharger le fichier yolov3.weights car il est trop volumineux. Vous devez donc le télécharger vous-même.
```
pip install -r requirements.txt
```
ça va installer les packages necessaires sur votre machine.

```
sudo apt-get update
sudo apt-get install mosquitto
```
ça va installer mosquito sur votre machine.

```
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```
ça va commencer le mosquitto.
```
mosquitto_sub -t '/test'
```
ça va subcriber sur topic nommé '/test'