const http = require("http");
const qs = require("querystring");
const mongoose = require("mongoose");

const ProductController = require("./lib-local/crud-product");
const CategorieController = require("./lib-local/crud-categories")
const GetList = require("./lib-local/get-function");

function error(req, res) {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('PAGE NOT FOUND');
}

const urlsGet = 
{
  "/api/V1/categories/list": GetList.getList,
  "/api/V1/categories/list/": GetList.getListId
}

const urlsBody = 
{
  "/api/V1/product/create/": ProductController.createProduct,
  "/api/V1/product/remove/": ProductController.removeProduct,
  "/api/V1/product/update/": ProductController.updateProduct,
  "/api/V1/product/delete/": ProductController.deleteProduct,
  "/api/V1/categories/create/": CategorieController.createCategorie,
  "/api/V1/categories/remove/": CategorieController.removeCategorie,
  "/api/V1/categories/update/": CategorieController.updateCategorie,
  "/api/V1/categories/delete/": CategorieController.deleteCategorie,
}

const server = http.createServer( async (req, res) => {

  const call = (urlsGet[req.url]) ? urlsGet[req.url] : (urlsBody[req.url]) ? urlsBody[req.url] : null;
  
  if(req.method == "GET" && urlsGet[req.url]) {
    call(req, res);
    return;
  }

  if(req.method == "POST" && urlsBody[req.url]) {
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
  
  await mongoose.connect("mongodb://MONGODB/DUMMY", {useNewUrlParser: true, useUnifiedTopology: true })
  .then((s) => console.log("Sucess connect mongodb \n"))
  .catch((e) => console.log("Error connect mongodb \n", e))

  console.log("server start at localhost:9000")
});
