const express = require("express");

const connectDB = require("./config/db");
const app = express();

//connect to db
connectDB();

//init middleware(to accept data)
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/google", require("./routes/google"));
app.use("/api/imageuploads", require("./routes/imageuploads"));
app.use("/api/social", require("./routes/social"));

//static folder for uploads
app.use("/uploads", express.static("uploads"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));
  app.use("/uploads", express.static("uploads"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
