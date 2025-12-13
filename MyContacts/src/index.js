const express = require("express");

const app = express();

app.get("/", (request, response) => {
  response.send("Hello, World!");
});

app.listen(3000, () => console.log("🚀 Server rodando na porta 3000"));
