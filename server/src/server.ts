import cors from 'cors';
import express from "express";
import path from 'node:path';
import routes from "./routes";
import { errors } from 'celebrate'

const app = express();
const port = 3333;

app.use(cors({}));
app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});