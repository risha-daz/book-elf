const express = require("express");
const connectDB = requite("./config/db");
const app = express();

//connect to db
connectDB();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.json({ msg: "Hello" }));

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
