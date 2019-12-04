const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema (
  {
    code: {type: Schema.Types.Mixed},
    name: {type: Schema.Types.Mixed},
  },
  {timestamps: true}
)

//adicionando o esquelo no modelo do banco
const category = mongoose.model("category", CategorySchema)

module.exports = category