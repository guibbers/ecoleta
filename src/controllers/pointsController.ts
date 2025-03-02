import knex from "../database/connection";
import type { Request, Response } from "express";

class PointsController {
	async show(req: Request, res: Response) {
		const { id }= req.params;

		const point = await knex('points').where('id', id).first();

		if(!point) {
			res.status(400).json({ message: "Point not found." })
		}

		const items = await knex('items')
			.join('point_items', 'items.id', '=', 'point_items.item_id')
			.where('point_items.point_id', id)
			.select('items.title')

		res.json({ point, items });
	}

	async create(req: Request, res: Response) {
		const { name, email, whatsapp, latitude, longitude, city, uf, items } =
			req.body;

		const trx = await knex.transaction();
    const point = {
			image: "https://images.unsplash.com/photo-1556767576-5ec41e3239ea?q=60&w=1974&auto=format&fit=crop&w=400ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
			name,
			email,
			whatsapp,
			latitude,
			longitude,
			city,
			uf,
		}

		const insertedIds = await trx("points").insert(point);
    const point_id = insertedIds[0]

		const pointItems = items.map((item_id: number) => {
			return {
				item_id,
				point_id
			};
		});

		await trx("point_items").insert(pointItems);

		await trx.commit();

		res.json({
      id: point_id,
      ...point
    });
	}

	async index(req: Request, res: Response) {
		const { city, uf, items } = req.query;
		const parsedItems = String(items)
			.split(',')
			.map(item=> Number(item.trim()));
		
		const points = await knex('points')
			.join('point_items', 'points.id', '=', 'point_items.point_id')
			.whereIn('point_items.item_id', parsedItems)
			.where('city', String(city))
			.where('uf', String(uf))
			.distinct()
			.select('points.*');

		res.json(points);
		
	}
}

export default PointsController;
