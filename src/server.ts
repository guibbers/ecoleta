import express from "express";
import path from 'node:path';
import routes from "./routes";

const app = express();
const port = 3333;

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});