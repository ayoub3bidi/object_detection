# Detection d'object
Un mini projet pour la matière mini projet: IoT (Mastère Professionnel en Ingénierie du Logiciel - Open Source à l'ISI).

## 1. Phase de comprendre l'utilisation de YOLO
Pour le premier phase, j'ai passé un peu de temps en experimentant avec google collab l'utilité de YOLO pour la detection des objects. Vous pouvez voir mon notebook sur Google collab [ici](https://colab.research.google.com/drive/1VSr4PVOL2Hj9FASWaUyxOUUAWA3vYCYB?usp=sharing).

## 2. Phase de mise en place MQTT broker
Pour la deuxieme phase on va decouvrir comment connecter avec MQTT broker, pour cette phase j'ai choisi mosquitto.  
**Notes**: Je peux pas uploader le fichier yolov3.weights ici car il est trop volumineux. Vous devez donc le télécharger vous-même.
```shell
pip install -r requirements.txt
```
ça va installer les packages necessaires sur votre machine.

```shell
sudo apt-get install libgtk2.0-dev pkg-config
```
ça va builder OpenCV avec le support GUI approperié.

```shell
sudo apt-get update
sudo apt-get install mosquitto
```
ça va installer mosquito sur votre machine.

```shell
sudo systemctl enable mosquitto
sudo systemctl start mosquitto
```
ça va commencer le mosquitto.

```shell
mosquitto_sub -t '/test'
```
ça va subcriber sur topic nommé '/test'


Vous pouvez cliquer `q` pour quitter.

## 3. Phase de la Création d'une application avec info détectée
Dans cette troisième et dernière phase, je vais ajouter de nouvelles fonctionnalités au programme afin que nous puissions utiliser les données détectées lors de la phase précédente.  

L'idée de cette application est que le programme détecte les objets à partir de la caméra. S'il détecte un téléphone, il dira à l'utilisateur de l'éteindre.

## 3.1 Premier feature: Camera window
Tout d'abord, j'ai ajouté la fenêtre de la caméra qui montre ce qu'elle voit, puis j'ai ajouté un rectangle de détection sur chaque objet qu'elle détecte avec une étiquette.

## 3.2 Deuxième feature: Voice activation detection
J'ai ajouté une fonction qui fonctionne lorsque la caméra détecte un utilisateur ayant un téléphone derrière lui et qui génère une voix disant qu'il doit éteindre son téléphone en utilisant le paquet gTTs.

## 3.3 Troisième feature: Chart window
J'ai ajouté une fonction qui génère une fenêtre contenant un graphique des informations détectées (les noms des objets détectés (coco.names) ont été réduits à 6 objets pour rendre le graphique lisible).

## 3.4 Quatrième feature: Enregistrer les données dans Firebase
J'ai créé une base de données firebase realtime, et je l'ai connectée à mon code en utilisant le package firebase_admin, et lorsque nous lançons le script main.py les données realtime seront sauvegardées dans la base de données sous le dossier "detections".

## 3.5 Cinquième feature: Affichage les données sur un page web
Je crée un projet react dans lequel je récupère les données de firebase et les utilise pour créer différents graphiques à l'aide de chart.js.

Pour lancer le projet sur votre machine, veuillez suivre les commandes ci-dessous:

```shell
cd object-detection-ui
npm install
```
Ceci va aller dans le répertoire du projet frontend et installer toutes les dépendances nécessaires.

```shell
npm run dev
```
Le projet sera ainsi exécuté localement sur votre machine.