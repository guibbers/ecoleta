import express from "express";

import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

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
routes.post('/points', 
  upload.single('image'),
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      city: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string().required(),
    })
  }, {
    abortEarly: false
  }),
  pointsController.create);

export default routes;