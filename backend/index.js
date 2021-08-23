if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");

const mysql = require("./utils/dbcon");
const queries = require("./utils/queries");

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "localhost";

const entries = require("./routes/entries");

app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join((__dirname, "public"))));

app.use("/entries", entries);

app.listen(process.env.PORT, (req, res) => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.redirect("entries");
});

app.all("*", (req, res, next) => {
    next("Page not found", 404);
});

app.use((err, req, res, next) => {
    res.send(err);
});
