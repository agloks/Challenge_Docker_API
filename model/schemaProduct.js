const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductSchema = new Schema (
  {
    name: {type: Schema.Types.Mixed, required: true},
    sku: {type: Schema.Types.Mixed, required: true, unique: true},
    price: {type: Schema.Types.Mixed, default: 0},
    quantity: {type: Number, default: 0},
    categories:[ {type:Schema.Types.ObjectId, ref:"category"} ],
    description: {type: Schema.Types.Mixed, default: "Empty"},
  },
  {timestamps: true}
)

//adicionando o esquelo no modelo do banco
const product = mongoose.model("product", ProductSchema)

// project.create(testProject).then((e) => console.log(e)).catch((e) => console.log(e))

module.exports = product