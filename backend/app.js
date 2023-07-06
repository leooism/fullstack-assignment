const express = require("express");
const { Router } = require("./Routes/BookRoute");

const app = express();
app.use(express.json());
app.use(Router);

app.listen(8000, () => {
	console.log("listening in port 8000");
});
