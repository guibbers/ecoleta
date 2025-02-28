import express from "express";

const routes = express.Router();

//Import Controllers
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

//Instance Controllers
const pointsController = new PointsController();
const itemsController = new ItemsController();

// List all items
routes.get('/items', itemsController.index);

//List specific collection point
routes.get('/points/:id', pointsController.show);

// Create collect point
routes.post('/points', pointsController.create);

export default routes;