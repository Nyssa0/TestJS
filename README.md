# TP1 Jour 2 - Gestionnaire de Membres pour une Boutique de Vêtements

## Pré-requis

- Node.js et npm installés.
- IDE ou éditeur de texte (comme Visual Studio Code).
- Jest
- Mongoose
- Express
- Supertest

## Commandes de Création du Projet

### Initialiser le projet

Installez les dépendances nécessaires :

```bash
npm install
```

Effectuer les tests unitaires :

```bash
npm run test:unit
```

Effectuer les tests d'intégration :

```bash
npm run test:inte
```

Effectuer les tests serveurs :

```bash
npm run test:server
```


# Résultats

## Défis rencontrés

Nous avons mis en place le code permettant de faire fonctionner le server (server.js) et corrigé les chemins dans les fichiers afin de pouvoir lancer correctement notre application. Il manquait également les tests "formulaire" et "enroll" que nous avons correctement travaillés.

#### Selenium

Selenium est un outil de test d'interface utilisateur qui permet d'automatiser les tests de navigation et d'interaction avec les pages web. Il peut être utilisé pour tester les fonctionnalités de l'interface utilisateur, les interactions utilisateur, les formulaires, les liens, les boutons, etc, dans différents navigateurs et environnements ce qui permet de garantir la compatibilité et la cohérence des fonctionnalités sur différentes plateformes.

Nous avons eu des difficultés avec Selenium sur des sélections d'éléments HTML pour changer une date de cours par exemple, et nous avons dû changer comment nous appelions les éléments HTML pour pouvoir les sélectionner. Il faut également suivre un ordre précis pour les tests, sinon ils ne fonctionnent pas, il faut donc rester méthodique.

Nous avons beacoup appris sur cette outil et nous avons pu l'utiliser pour automatiser les tests de navigation et de soumission de formulaires.

## Couverture de tests

La couverture de tests actuelle se concentre sur le formulaire avec la vérification de la soumission réussie, la gestion des erreurs pour des entrées manquantes ou invalides, ainsi que l'inscription aux cours avec l'enregistrement réussi des cours et la gestion des conflits d'horaires pour éviter les inscriptions en double.

Pour améliorer la couverture de tests, nous pourrions ajouter la vérification des formats de données de formulaires et pour les champs facultatifs et leurs comportements.
Nous pouvons également tester la performance avec mesure des temps de réponse pour différentes opérations et les multiples requêtes simultanées, ainsi que des tests de sécurité.

## Importance des tests

Les tests sont importants pour garantir le bon fonctionnement de l'application et pour s'assurer que les nouvelles fonctionnalités ajoutées ne cassent pas les fonctionnalités existantes. Ils permettent également de détecter les erreurs et les bugs plus tôt dans le processus de développement, ce qui permet d'économiser du temps et des efforts pour les corriger. Les tests aident également à documenter le code et à faciliter la maintenance et l'évolution de l'application.

