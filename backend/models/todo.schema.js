import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    titre: {
        type: String,
        required: true,
      },
      priorite: {
        type: String, // Vous pouvez ajuster le type selon vos besoins (String, Number, etc.)
        required: true,
        enum: ['Hight', 'Medium', 'Low']
      },
      statut: {
        type: String,
        enum: ['À faire', 'En cours', 'Terminée'], // Enumération des statuts possibles
        default: 'À faire',
      },
      description: {
        type: String,
      },
      supprimeA: {
        type: Date,
        default: null,
      },
      creePar: {
        type: String, // Ou vous pouvez utiliser un type ObjectId si vous avez un modèle d'utilisateur
        required: true,
      },
      deadline: {
        type: Date,
        required: false, // Vous pouvez ajuster selon que la deadline est optionnelle ou non
      },
      commentaires: [
        {
          auteur: {
            type: String, // Ou ObjectId si vous avez un modèle d'utilisateur
            required: true,
          },
          contenu: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],
    });

const TodoModel = mongoose.model("Todo" , TodoSchema)
export default TodoModel

