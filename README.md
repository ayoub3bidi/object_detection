# Detection d'object
Un mini projet pour la matière mini projet: IoT (Mastère Professionnel en Ingénierie du Logiciel - Open Source à l'ISI).

## Phase de comprendre l'utilisation de YOLO
Pour le premier phase, j'ai passé un peu de temps en experimentant avec google collab l'utilité de YOLO pour la detection des objects. Vous pouvez voir mon notebook sur Google collab [ici](https://colab.research.google.com/drive/1VSr4PVOL2Hj9FASWaUyxOUUAWA3vYCYB?usp=sharing).

## Phase de mise en place MQTT broker
Pour la deuxieme phase on va decouvrir comment connecter avec MQTT broker.

```
pip install -r requirements.txt
```
ça va installer les packages necessaires sur votre machine.

```
sudo apt install mosquitto
```
ç va installer mosquito sur votre machine.

```
mosquitto_sub -t '/test'
```
ça va subsriver sur topic nommé '/test'
