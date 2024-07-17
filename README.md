# TP1 Jour 2 - Gestionnaire de Membres pour une Boutique de Vêtements

## Étudiants :
- Hassina AYACHI
- Joanne MASSILLON
- Alexandre CHARLES
- Mehdi AL SID CHEIKH

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

## Détails
Nous avons suivi la méthode TDD pour réaliser ce projet. Nous avons commencé par écrire les tests unitaires, puis le test serveur et enfin les tests d'intégration.
Par manque de temps, nous n'avons pas pu développer les controllers et les routes, car ces derniers n'étaient pas nécessaires pour nos tests.

## Problèmes rencontrés

Les tests d'intégration fonctionnent lorsqu'on les lance séparément, cependant, lorsqu'on les lance tous en même temps, ils échouent une fois sur quatre.
De plus, Jest semble tourné en boucle lorsqu'on lance les tests d'intégration. Sur un IDE cela ne pose pas trop de problème, car ce dernier effectue un force quit après un certain temps, 
mais Github Actions ne le fait pas, ce qui le fait tourner indéfiniment. Nous avons essayé de trouver une solution à ces problèmes mais sans succès.