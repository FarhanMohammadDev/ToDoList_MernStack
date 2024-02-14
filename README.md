# Gestionnaire de Tâches Pro

Gestionnaire de Tâches Pro est une application full-stack JavaScript conçue pour aider les utilisateurs à organiser leurs tâches de manière efficace. L'application offre une interface utilisateur conviviale pour ajouter, visualiser, mettre à jour et supprimer des tâches, ainsi que la possibilité de marquer les tâches comme terminées.

## Technologies Utilisées

- **Frontend :**
  - ReactJS
  - Axios
  - Tailwind CSS

- **Backend :**
  - Node.js
  - ExpressJS
  - MongoDB (Mongoose ODM)

- **Outils de Test :**
  - Jest
  - Supertest
  - Sinon (pour le mocking)

## Installation

1. Clonez le dépôt GitHub :

   ```
   git clone <lien-du-dépôt>
   ```

2. Installez les dépendances pour le frontend et le backend :

   ```
   cd frontend
   npm install

   cd ../backend
   npm install
   ```

3. Assurez-vous que MongoDB est installé localement ou configurez une base de données MongoDB distante.

4. Lancez le serveur backend :

   ```
   cd backend
   npm start
   ```

5. Lancez l'application frontend :

   ```
   cd frontend
   npm start
   ```

L'application sera accessible à l'adresse `http://localhost:3000` par défaut.

## Fonctionnalités

- **Ajouter une Tâche :** Les utilisateurs peuvent ajouter de nouvelles tâches avec un titre, une priorité, une description et une date limite.
- **Afficher les Tâches :** Affichage de la liste des tâches avec leurs détails.
- **Marquer comme Terminé :** Les utilisateurs peuvent marquer les tâches comme terminées.
- **Modifier et Supprimer des Tâches :** Les utilisateurs peuvent mettre à jour et supprimer des tâches existantes.
- **Gestion des Erreurs :** Le serveur gère les erreurs et les affiche de manière appropriée.

## Contribution

Les contributions sont les bienvenues ! Pour toute suggestion d'amélioration, veuillez ouvrir une issue pour discuter des changements proposés.

## Auteurs

- FARHAN MOHAMMAD
- EZAROALI Oumaima

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
