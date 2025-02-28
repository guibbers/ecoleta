import knex from "../database/connection";
import type { Request, Response } from "express";

class PointsController {
	async show(req: Request, res: Response) {
		const { id }= req.params;

		const point = await knex('points').where('id', id).first();

		if(!point) {
			res.status(400).json({ message: "Point not found." })
		}

		res.json(point);
	}

	async create(req: Request, res: Response) {
		const { name, email, whatsapp, latitude, longitude, city, uf, items } =
			req.body;

		const trx = await knex.transaction();
    const point = {
			image: "image-fake",
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

		res.json({
      id: point_id,
      ...point
    });
	}	
}

export default PointsController;
