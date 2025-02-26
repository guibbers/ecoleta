import express from "express";

const app = express();
const port = 3333;

app.use(express.json())

const users = ["Diego", "Guilherme", "Robson", "Pedro"];

app.get("/users", (req, res) => {
  const search = String(req.query.search);

  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
  
	res.json(filteredUsers);
});

app.get("/users/:id", (req, res) => {
	const id = Number(req.params.id);
	const user = users[id];
  res.json(user)
});

app.post("/users", (req, res) => {
	const data = req.body;
  const user = {
    "name": 
  }

  console.log(data);

  res.json(data)
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
