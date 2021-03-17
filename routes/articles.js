const express = require("express");

const Article = require("../models/article");
const router = express.Router();


router.get("/new", (req, res) => {
    res.render("articles/new", { article: new Article() })
});


router.get("/edit/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.render("articles/edit", { article: article })
    } catch (e) {
        console.log(e);
    }
})


router.get("/:slug", async (req, res) => {
    try {

        let article = await Article.findOne({ slug: req.params.slug });
        if (article == null) { res.redirect('/') }
        res.render("articles/show", { article: article })
    } catch {
        console.log("ye kari bokon");
    }
})





router.post("/", async (req, res, next) => {
    req.article = new Article();
    next();
}, saveArticleAndRedirect("new"))


router.put("/:id", async (req, res, next) => {
    try {
        req.article = await Article.findById(req.params.id)
        next();
    }catch(e){
        console.log(e);
    }
}, saveArticleAndRedirect("edit"))







function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown

        try {
            article = await article.save();
            res.redirect(`/articles/${article.slug}`)
        } catch (e) {

            res.render(`/articles/${path}`, { article: article })
        }

    }

}


router.delete("/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id);
    res.redirect("/")

})



module.exports = router;
// let article = new Article({
//     title: req.body.title,
//     description: req.body.description,
//     markdown: req.body.markdown
// })
// try {
//     article = await article.save();
//     res.redirect(`/articles/${article.slug}`)
// } catch (e) {
//     console.log(e);
//     res.render("articles/new", { article: article })
// }