const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CategorySchema = new Schema (
  {
    name: {type: Schema.Types.Mixed, required: true},
    code: {type: Schema.Types.Mixed, unique: true, required: true},
  },
  {timestamps: true}
)

//adicionando o esquelo no modelo do banco
const category = mongoose.model("category", CategorySchema)

module.exports = category