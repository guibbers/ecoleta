import express from "express";
import knex from './database/connection'

const routes = express.Router();

// LIST ALL ITEMS
routes.get('/items', async (req, res)=>{
  const items = await knex('items').select('*');

  const serializedItems = items.map(item =>{
    return {
      id: item.id,
      title: item.name,
      image_url: `http://localhost:3333/uploads/${item.image}`
    }
  })

  res.json(serializedItems)
});

// CREATE COLLECT POINT
routes.post('/points', async (req, res)=>{
  const {
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf,
    items
  } = req.body;

  const ids = await knex('points').insert({
    image: 'image-fake',
    name,
    email,
    whatsapp,
    latitude,
    longitude,
    city,
    uf
  });

  const pointItems = items.map((item_id: number) =>{
    return {
      item_id,
      point_id: ids[0]
    }
  });

  await knex('point_items').insert(pointItems);

  res.json({ success: true});
})

export default routes;