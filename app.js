const http = require("http");
const qs = require("querystring");
const mongoose = require("mongoose");

const ProductController = require("./lib-local/crud-product");
const CategorieController = require("./lib-local/crud-categories")
const GetList = require("./lib-local/get-function");
const log = require("./lib-local/log")

function error(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('PAGE NOT FOUND');
}

const urlsPost = 
{
  "/api/V1/product/create/": ProductController.createProduct,
  "/api/V1/categories/create/": CategorieController.createCategorie,
}

const urlsPut =
{
  "/api/V1/product/update/": ProductController.updateProduct,
  "/api/V1/categories/update/": CategorieController.updateCategorie,
}

const urlsPatch =
{
  "/api/V1/product/remove/": ProductController.removeProduct,
  "/api/V1/categories/remove/": CategorieController.removeCategorie,
}

const urlsDelete = 
{
  "/api/V1/product/delete/": ProductController.deleteProduct,
  "/api/V1/categories/delete/": CategorieController.deleteCategorie,
}

const server = http.createServer( async (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if(req.method == "POST" && urlsPost[req.url]) {
    const date = new Date()
    log (
      `
      ${date.toLocaleTimeString()} POST ROUTE
      `,"./logs"
    )
    const call = urlsPost[req.url];
    let body = "";
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    })
    req.on("end", () => {
      body = qs.parse(body);
      call(req, res , body);
    })
    return;
  }

  if(req.method == "PUT" && urlsPut[req.url]) {
    const date = new Date()
    log (
      `
      ${date.toLocaleTimeString()} PUT ROUTE
      `,"./logs"
    )

    const call = urlsPut[req.url];
    let body = "";
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    })
    req.on("end", () => {
      body = qs.parse(body);
      call(req, res , body);
    })
    return;
  }

  if(req.method == "PATCH" && urlsPatch[req.url]) {
    const date = new Date()
    log (
      `
      ${date.toLocaleTimeString()} PATCH ROUTE
      `,"./logs"
    )

    const call = urlsPatch[req.url];
    let body = "";
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    })
    req.on("end", () => {
      body = qs.parse(body);
      call(req, res , body);
    })
    return;
  }

  if(req.method == "DELETE" && urlsDelete[req.url]) {
    const date = new Date()
    log (
      `
      ${date.toLocaleTimeString()} DELETE ROUTE
      `,"./logs"
    )
    
    const call = urlsDelete[req.url];
    let body = "";
    req.on("data", (data) => {
      body += data;
      if (body.length > 1e6) req.connection.destroy();
    })
    req.on("end", () => {
      body = qs.parse(body);
      call(req, res , body);
    })
    return;
  }

  error(null, res);
})


server.listen(9000, async () => {
  
  log (
    `
    SERVER STARTED - PORT 9000
    `,"./logs"
  )

  await mongoose.connect("mongodb://MONGODB/DUMMY", {useNewUrlParser: true, useUnifiedTopology: true })
  .then((s) => console.log("Sucess connect mongodb \n"))
  .catch((e) => console.log("Error connect mongodb \n", e))

  console.log("server start at localhost:9000")
});
