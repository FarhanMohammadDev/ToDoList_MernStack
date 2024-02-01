import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priorite: {
    type: String, // Vous pouvez ajuster le type selon vos besoins (String, Number, etc.)

    enum: ["Hight", "Medium", "Low"],
  },
  status: {
    type: String,
    enum: ["To do", "Doing", "Done"], // Enumération des statuts possibles
    default: "To do",
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
  },
  deadline: {
    type: Date,
    // Vous pouvez ajuster selon que la deadline est optionnelle ou non
  },
  commentaires: [
    {
      auteur: {
        type: String, // Ou ObjectId si vous avez un modèle d'utilisateur
      },
      contenu: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const TodoModel = mongoose.model("Todo", TodoSchema);
export default TodoModel;
