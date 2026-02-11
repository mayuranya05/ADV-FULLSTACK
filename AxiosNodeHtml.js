const express = require("express");
const axios = require("axios");
const app = express();
var bodyParser = require('body-parser');

const base_url = "http://localhost:3000";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books');
        res.render("books", { books: response.data });
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get("/book/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("book", { book: response.data });
    } catch (error) {
        res.status(500).send('Error 2');
    }
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.post("/create", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author};
        await axios.post(base_url + '/books', data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send('Error 3');
    }
});

app.get("/update/:id", async (req, res) => {
    try {
        const response = await axios.get(base_url + '/books/' + req.params.id);
        res.render("update", { book: response.data });
    } catch (error) {
        res.status(500).send('Error 4');
    }
});

app.post("/update/:id", async (req, res) => {
    try {
        const data = { title: req.body.title, author: req.body.author};
        await axios.put(base_url + '/books/' + req.params.id, data);
        res.redirect("/");
    } catch (error) {
        res.status(500).send('Error 5');
    }
});

app.get("/delete/:id", async (req, res) => {
    try {
        await axios.delete(base_url + '/books/' + req.params.id);
        res.redirect("/");
    } catch (error) {
        console.error(error);
        res.status(500).send('Error 6');
    }
});

app.listen(5500, () => {
    console.log("Server started on port5500");
});