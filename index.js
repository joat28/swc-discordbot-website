const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const anc = require('./ancs');


const bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));


app.set("view engine", "ejs");

app.get("/swcanc", (req, res) => {
    res.render('home');
});

app.post("/swcanc", (req, res) => {
    const announcement = req.body.mod_anc;
    try {
        anc.execute(announcement);
        // res.json({
        //     info: "Now type get anc to get the announcement in all channels with webhooks",
        //     message: "Success",
        //     anc: "/rs"
        // });
        res.redirect("/success");
        
    } catch (error) {
        console.log(error);
        res.json({
            info: "Some error occurred",
            error: error
        })
    }
});
app.get('/swcanc/success', (req, res) => {
    res.render('success');
})
app.get("/swcanc/rs", (req, res) => {
    res.redirect("/swcanc");
    process.exit(1);
   
});


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
