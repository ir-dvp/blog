const express = require("express")
const articleRouter = require("./routes/articles")
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const db = require("./models/article");
const methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blog", {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));


app.get("/", async (req, res) => {
    
    const articles = await db.find().sort({time:"desc"});
     res.render("articles/index", { articles: articles });
});


app.use("/articles", articleRouter);
app.listen(3000);