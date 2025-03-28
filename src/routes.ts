import express from "express";

import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

//Import Controllers
import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";

//Instance Controllers
const pointsController = new PointsController();
const itemsController = new ItemsController();

// List all items
routes.get('/items', itemsController.index);

//List all collection points
routes.get('/points', pointsController.index);

//List specific collection point
routes.get('/points/:id', pointsController.show);

// Create collect point
routes.post('/points', upload.single('image') , pointsController.create);

export default routes;

// {   
//   "name": "Mercadinho",
//   "email": "contato@pomar.com.br",
//   "whatsapp": "21999999999",
//   "latitude": -22.903727,
//   "longitude": -43.1013029,
//   "city": "Niterói",
//   "uf": "RJ",
//   "items": [
//       3,
//       4
//   ]
//   }