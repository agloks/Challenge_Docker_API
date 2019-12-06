const mongoose = require("mongoose");
const db_category = require("../model/schemaCategory")

module.exports = new class ProductController {

  constructor() {}

  async createCategorie(req, res, body) {
    try {
      if(!Object.keys(body).length) throw new Error("Body vazio")
      
      const {name, code} = body;
      const sucess = await db_category.create(body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in create Categorie \n ${e}$`);
    }
  }
  
  async removeCategorie(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      let objSend = {};
      const {code} = body;
      for(let k in body) {
        if(body[k] === "remove") objSend[k] = ""; 
      }
      const sucess = await db_category.findOneAndUpdate({code: code}, objSend);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in remove Categorie \n ${e}$`);
    }
  }
  
  async updateCategorie(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      const {code} = body;
      const sucess = await db_category.findOneAndUpdate({code: code}, body);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in update Categorie \n ${e}$`);
    }
  }
  
  async deleteCategorie(req, res, body) {
    try{
      if(!Object.keys(body).length) throw new Error("Body vazio")

      const {code} = body;
      const sucess = await db_category.findOneAndDelete({code: code});
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: sucess}));
    } catch(e) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({result: "error"}));
      console.log(`error in delete Categorie \n ${e}$`);
    }
  }
}()