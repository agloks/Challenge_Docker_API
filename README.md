# Backend RESTFul API

## technologies

- Node.js  

- MongoDB

- Docker

## Dependencies

- Mongoose 

## Steps
 
# Download and transfer project files

### 1) Clone the repository, install node packages, up docker and verify routes locally

``` 
//on local
git clone https://github.com/agloks/node-dck.git
cd node-dck
npm install
docker-compose up --build
```

## Create Methods

### Laboratorio

Create `Produto` calling route POST: http://localhost:9000/api/V1/product/create/ :

 Key| Description| Required
 ---|---|---
 `name`       | product name.             | **Yes**
 `sku`      | product code sku.                            | **Yes**
 `price`  | price product.                         | No, <br> Default setting: `true`.
 `quantity` | number of product.
 `categories`  | name of category on db                        | No, <br> Default setting: `true`.
 `description`  | description product                         | No, <br> Default setting: `true`.

### Exames

Create `Categorias` using calling route POST: http://localhost:9000/api/V1/categories/create/ :

 Key| Description| Required
 ---|---|---
 `name`       | name of category.             | **Yes**
 `code`      | code of category.                            | **Yes**


## Remove Methods

### Laboratorio

Remove any value in `Produto` calling route PATCH: http://localhost:9000/api/V1/product/remove/ :

 Key| Description| Required
 ---|---|---
 `name`       | write as value = "remove"             | No
 `sku`      | code of sku don't is able to remove                            | **Yes**
 `price`  | write as value = "remove"                         | No
 `quantity` | write as value = "remove"
 `categories`  | write as value = "remove"                       | No
 `description`  | write as value = "remove"                         | No

### Exames

Remove any value in `Categorias` using calling route PATCH: http://localhost:9000/api/V1/categories/remove/ :

 Key| Description| Required
 ---|---|---
 `name`       | write as value = "remove"             | No
 `code`      | code of category don't is able to remove                           | **Yes**


## Update Methods

### Laboratorio

Update any value in `Produto` calling route PUT: http://localhost:9000/api/V1/product/update/ :

 Key| Description| Required
 ---|---|---
 `name`       | product name.             | No
 `sku`      | code of sku don't is able to remove                            | **Yes**
 `price`  | price product.                         | No
 `quantity` | number of product.
 `categories`  | here is to add more categories to product                        | No
 `description`  | description product                         | No

### Exames

Remove any value in `Categorias` calling route PUT: http://localhost:9000/api/V1/categories/update/ :

 Key| Description| Required
 ---|---|---
 `name`       | category name.             | No
 `code`      | code of category don't is able to remove                           | **Yes**

 ## Update Methods


## Delete Methods

### Laboratorio

Delete `Produto` calling route DELETE: http://localhost:9000/api/V1/product/delete/ :

 Key| Description| Required
 ---|---|---
 `sku`      | product code sku.                            | **Yes**

### Exames

Delete `Categorias` calling route DELETE: http://localhost:9000/api/V1/categories/delete/ :

 Key| Description| Required
 ---|---|---
 `code`      | code of category.                           | **Yes**


## Tests

They were fully realized in Postman's automated environment, proving the success of each functionality. The tests that were done in this case can be seen in the figure below, just in the left tab. Postman is an extremely useful tool for manually testing or automating testing of any REST API.