import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  priorite: {
    type: String, // Vous pouvez ajuster le type selon vos besoins (String, Number, etc.)
    enum: ["Hight", "Medium", "Low"],
    default: "Hight",
  },
  status: {
    type: String,
    enum: ["To do", "Doing", "Done"], // Enumération des statuts possibles
    default: "To do",
  },
  description: {
    type: String,
  },
  startDate:{
    type: Date,
  },
  endDate: {
    type: Date,
  },
  deleted: { 
    type: Boolean,
     default: false
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
},{ timestamps: true });

const TodoModel = mongoose.model("Todo", TodoSchema);
export default TodoModel;
