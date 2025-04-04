import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";

export default {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, "..", "..", "uploads"),
		filename(req, file, callback) {
			const hash = crypto.randomBytes(6).toString("hex");

			const fileName = `${hash}-${file.originalname}`;

			callback(null, fileName);
		},
	}),
};
