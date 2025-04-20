import express from "express";
import bodyParser from "body-parser";
import axios from "axios";


const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
     const response = await axios.get("https://api.jikan.moe/v4/top/anime");
     const result = response.data.data;
     res.render("index.ejs", { data: result });   
});

app.get("/search", async (req, res) => {
    try {
        const query = req.query.search;
        const response = await axios.get("https://api.jikan.moe/v4/anime?q=" + query);
        const result = response.data.data;
        console.log(result);
        res.render("index.ejs", { search: result, query });
    } catch (error) {
        console.error("Unable to retrieve anime information:", error.message);
        res.render("index.ejs", {query: query });
    }
});

app.get("/random", async(req, res) => {
    const response = await axios.get("https://api.jikan.moe/v4/random/anime");
    const result = response.data.data;
    console.log(result);
    res.render("random.ejs", {random: result});
});

app.get("/anime/:id", async(req, res) => {
    const id = req.params.id;
    const response = await axios.get("https://api.jikan.moe/v4/anime/" + id);
    const result = response.data.data;
    res.render("anime.ejs", { anime: result, id: id });
});



app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
})