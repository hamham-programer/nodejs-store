/**
 * @swagger
 *  components:
 *      schemas:
 *          Product:
 *              type: object
 *              required:
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   tags
 *                  -   category
 *                  -   price
 *                  -   discount
 *                  -   count
 *              properties:
 *                  title:
 *                      type: String
 *                      description: the title of product
 *                  short_text:
 *                      type: String
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product box
 *                  weight:
 *                      type: string
 *                      description: the weight of product box
 *                  width:
 *                      type: string
 *                      description: the with of product box
 *                  length:
 *                      type: string
 *                      description: the length of product box
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 */
/**
 * @swagger
 *  definitions:
 *      publicDefinitions:
 *          type: object
 *          properties:
 *              statusCode:
 *                  type: integer
 *                  example: 20X
 *              data:
 *                  type: object
 *                  properties:
 *                      message:
 *                          type: string
 *                          example: "the best message for that action"
 */
/**
 * @swagger
 *  components:
 *      schemas:
 *          Edit-Product:
 *              type: object
 *              properties:
 *                  title:
 *                      type: String
 *                      description: the title of product
 *                  short_text:
 *                      type: String
 *                      description: the short_text of product
 *                  text:
 *                      type: string
 *                      description: the text of product
 *                  tags:
 *                      type: array
 *                      description: the tags of product
 *                  category:
 *                      type: string
 *                      description: the category of product
 *                  price:
 *                      type: string
 *                      description: the price of product
 *                  discount:
 *                      type: string
 *                      description: the discount of product
 *                  count:
 *                      type: string
 *                      description: the count of product
 *                  images:
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  height:
 *                      type: string
 *                      description: the height of product box
 *                  weight:
 *                      type: string
 *                      description: the weight of product box
 *                  width:
 *                      type: string
 *                      description: the with of product box
 *                  length:
 *                      type: string
 *                      description: the length of product box
 *                  type:
 *                      type: string
 *                      description: the type of product 
 *                      example: virtual - physical
 */

/**
 * @swagger
 *  /admin/products/add:
 *      post:
 *          tags: [product(Adminpanel)]
 *          summary: create and save product
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Product"
 *          responses:
 *              201:
 *                  description: create new product   
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/definitions/publicDefinitions" 
 */
/**
 * @swagger
 *  /admin/products/list:
 *      get:
 *          tags: [product(Adminpanel)]
 *          summary: get all product
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search  in title, text, short_text
 *          responses:
 *              200:
 *                  description: success  
 */
/**
 * @swagger
 *  /admin/products/{id}:
 *      get:
 *          tags: [product(Adminpanel)]
 *          summary: get one products
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/remove/{id}:
 *      delete:
 *          tags: [product(Adminpanel)]
 *          summary: delete one products
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  description: objectId of product
 *          responses:
 *              200:
 *                  description: success
 */
/**
 * @swagger
 *  /admin/products/edit/{id}:
 *      patch:
 *          tags: [product(Adminpanel)]
 *          summary: create and save product
 *          parameters:
 *              -   in: path        
 *                  name: id
 *                  type: string    
 *                  description: id of product for update product
 *          requestBody:
 *              required: true
 *              content: 
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: "#/components/schemas/Edit-Product"
 *          responses:
 *              200:
 *                  description: updated product   
 */