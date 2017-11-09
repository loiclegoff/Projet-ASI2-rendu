Axel Fraysse
Julien Vercaemer
Loïc Le Goff


-- Avancement partie Node.js

TP NodeJS step-by-step

Création de l'arborescence initiale - OK

Initialisation du projet avec npm. Le main de l'application va s'appeler app.js. - OK


Point de validation 1

Initialisation de express - OK

Création du fichier config.json à la racine du projet, et alimentation avec le port d'écoute du serveur. - OK


Initialiser votre serveur web en utilisant express et la bibliothèque http de NodeJS. Récupérer le port d'écoute depuis le fichier de configuration config.json. - OK


Faire en sorte que la route "/" réponde "It works".
La "meilleure" façon de faire une route est de créer un router (express.Router()) dans un nouveau fichier (default.route.js) dans le répertoire route. - OK


Completer l'arborescence.- OK


Créer les routes statiques pour les pages admin et watch directement dans app.js. Utiliser la méthode express.static. - OK


Point de validation 2

Mettre à jour le fichier config.json - OK


Créer les webservices "/loadPres" et "/savePres". - OK


Point de validation 3

Créer le modele de donnée pour le contenu des slides.
Créer le fichier content.model.js dans app/models/. - OK


Lancer les tests unitaires via la commande npm test. La commande doit se terminer par un === FIN TESTS ===. - OK

Point de validation 4

Créer le router pour exposer les web services REST d'accès au contenu (content.router.js). Ce routeur ne comporte pas de métier, il se contente d'appeler le controleur avec les bons paramètres. Ajouter ce router à app.js (comme pour le default.route.js). - Ok


Point de validation 5

Créer le controleur (content.controller.js) pour faire le lien entre le routeur et le modèle. -Le code a été emprunté au groupe de Dorian Bouchet pour nous permettre d'avancer

Point de validation 6

Créer le serveur de websocket et gérer les évènements.
Installer la bibliothèque socket.io via npm (et l'ajouter au package.json). Cette librairie permet de créer des websockets avec NodeJS.
Créer un nouveau controleur (io.controller.js). Les évènements des websockets seront gérés dans ce controleur. - OK


Point de validation 7

Gérer les évènements côté clients en utilisant un controleur dédié. - NON OK


Point de validation 8

Après le point de validation 8 les questions n'ont pas été traitées


-- Avancement partie JEE : OK 

(entièrement terminé)


-- Avancement partie React.js : partiellement OK 

STEP 1-5 terminée
STEP 6 non traité

-- lien git : https://github.com/loiclegoff/Projet-ASI2-rendu.git