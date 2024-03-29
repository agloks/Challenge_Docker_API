const mongoose = require("mongoose");
const db_product = require("../model/schemaProduct");
const db_category = require("../model/schemaCategory")

module.exports = new class ProductController {

  constructor() {}

  async createProduct(req, res, body) {
    try {
      if(!Object.keys(body).length) throw new Error("Body vazio")

      const {name, sku, price, quantity, categories, description} = body;
      /*
      checamos se a categoria existe ou estar sendo enviado corretamente, para que possamos
      mandar o id do mesmo para o array de id no field categories da nossa colection product 
      */
      const categoryCheckExist = await db_category.findOne({name: categories});
      if(categoryCheckExist) {
        body.categories = categoryCheckExist._id;
        const sucess = await db_product.create(body);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({result: sucess}));
      }
      else {
        const sucess = await db_product.create(body);
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({result: sucess}));
      }
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in create product \n ${e}$`)
    }
  }
  
  async removeProduct(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      let objSend = {};
      const {sku} = body;
      for(let k in body) {
        if(body[k] === "remove") objSend[k] = ""; 
      }
      if(sku !== body["sku"]) throw new Error("Não é possível remover sku")

      const sucess = await db_product.findOneAndUpdate({sku: sku}, objSend)
      .then((s) => db_product.findById(s._id));;
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in remove Product \n ${e}$`);
    }
  }
  
  async updateProduct(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      const {sku, categories} = body;
      /*
      checando novamente com o plus de remover a proprierdade do body para não sobrescrever o array,
      então logo inserimos na mão mesmo.
      */
      const categoryCheckExist = await db_category.findOne({name: categories});
      if(categoryCheckExist) {
        delete body["categories"];
        const sucess = await db_product.findOneAndUpdate({sku: sku}, {...body, $push: {categories: categoryCheckExist._id}})
        .then((s) => db_product.findById(s._id));
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({result: sucess}));
      } else {
        const sucess = await db_product.findOneAndUpdate({sku: sku}, body)
        .then((s) => db_product.findById(s._id));;
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({result: sucess}));
      }
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in update Product \n ${e}$`);
    }
  }
  
  async deleteProduct(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      const {sku} = body;
      const sucess = await db_product.findOneAndDelete({sku: sku});
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in update Product \n ${e}$`);
    }
  }
}()