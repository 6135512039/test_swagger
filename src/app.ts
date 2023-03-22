import express, { Express, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const app: Express = express();
const PORT: number = 3000;

interface User {
    id: number;
    name: string;
    role: string;
}

const users: User[] = [
    {
        id: 1,
        name: "Tang",
        role: "software developer"
    },
    {
        id: 2,
        name: "Dew",
        role: "software developer"
    },
    {
        id: 3,
        name: "Game",
        role: "software developer"
    }
];

interface Product {
    id: number;
    name: string;
    price: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "milk",
        price: "10 bath"
    },
    {
        id: 2,
        name: "moo",
        price: "200 bath"
    },
    {
        id: 3,
        name: "mee",
        price: "1000 bath"
    }
];

function getAllUser(req: Request, res: Response) {
    res.json(users);
}

function createUserByUserId(req: Request, res: Response) {
    const userId: string = req.params.userId;

    res.send(`Hello ${userId}`);
}

function getUserByUserId(req: Request, res: Response) {
    const userId: number = parseInt(req.params.userId);
    const user = users.find((user) => user.id === userId);

    res.json(user);
}

function getAllProduct(req: Request, res: Response) {
    res.json(products);
}

function getProductByProductId(req: Request, res: Response) {
    const productId: number = parseInt(req.params.productId);
    const product: Product | undefined = products.find((product) => product.id === productId);

    res.json(product);
}

function createProductByProductId(req: Request, res: Response) {
    const productId: string = req.params.productId;

    res.send(`This is product ${productId}`);
}

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Library API",
            version: "1.00"
        }
    },
    apis: ['./src/app.ts']
}

const swaggerDocument = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * @swagger
 * /user/v1/users:
 *      get:
 *        description: get all user
 *        responses:
 *          200:
 *            description: success
 * 
 */
app.get("/user/v1/users", getAllUser);

/**
 * @swagger
 * /user/v1/users/id/{userId}:
 *  get:
 *    summary: get user by userId
 *    parameters: 
 *      - name: userId
 *        in: path
 *        schema: 
 *          type: integer
 *        required: true
 *        description: numeric of user
 *    responses: 
 *      200:
 *        description: success
 */
app.get("/user/v1/users/id/:userId", getUserByUserId);

/**
 * @swagger
 * /user/v1/users/{userId}:
 *   post:
 *     summary: create user by userId
 *     parameters: 
 *      - name: userId
 *        in: path
 *        schema:
 *          type: integer
 *        required: true
 *        description: numeric of user id
 *     responses:
 *       '200':
 *         description: success
 */
app.post("/user/v1/users/:userId", createUserByUserId);

/**
 * @swagger
 * /product/v1/products:
 *      get:
 *        description: get all product
 *        responses: 
 *          200:
 *            description: success
 */
app.get("/product/v1/products", getAllProduct);

/**
 * @swagger
 * /product/v1/products/id/{productId}:
 *      get: 
 *        summary: get product by productID
 *        parameters:
 *          - name: productId
 *            in: path
 *            schema:
 *              type: integer
 *            required: true
 *            description: numeric of product
 *        responses: 
 *          200:
 *            description: success
 */
app.get("/product/v1/products/id/:productId", getProductByProductId)

/**
 * @swagger
 * /product/v1/products/{productId}:
 *      post:
 *        summary: create product by productId
 *        parameters: 
 *          - name: productId
 *            in: path
 *            schema:
 *              type: integer
 *            required: true
 *            description: numeric of product
 *        responses:
 *          200:
 *            description: success
 */
app.post("/product/v1/products/:productId", createProductByProductId);

app.listen(PORT, () => {
    console.log(`Running on Server Port ${PORT}`)
});
