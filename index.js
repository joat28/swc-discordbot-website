//Import packages
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");



const PORT = process.env.PORT || 8080;

//import Modules
const anc = require("./ancs");

//Mongoose and Database Connection 
const DB_URI = process.env.DB_URI;
mongoose
	.connect(DB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => console.log("Database connected"))
	.catch((error) => {
		console.log("Error connecting to Database!");
		console.log(error);
	});

//import Models and middleware
const User = require("./models/user");

//import middleware
const checkAuth = require("./middleware/checkAuth");


//serve static files
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Root Route - for Authorization
app.get("/swcanc",  (req, res) => {
	res.render("auth");
});

//Register Route
app.get("/swcanc/register", (req, res) => {
	res.render("register");
});
app.post("/swcanc/register", async (req, res) => {
	const { username, password, name } = req.body;
	if (username === "" || password === "" || name === "") {
		return res.json({
			status: "error",
			message: "Invalid username/password",
		});
	}
	const newUser = new User({
		username,
		password,
		name,
	});
	newUser.save((error) => {
		if (error) {
			console.log(error);
			return res.json({
				status: "error",
				message: "Error in registering user",
				error: error,
			});
		} else {
			return res.json({
				status: "ok",
				message: "You are logged in",
			});
		}
	});
});


//Login route

app.get("/swcanc/login", (req, res) => {
	res.render("login");
});
app.post("/swcanc/login", (req, res) => {
    //Authenticate user using comparePasswords
    //set jwt in authorization headers
    //set middleware for protected routes
    //Logout user by changing Authorization header
    const { username, password } = req.body;
    if (username === '' || password === '') {
        return res.json({
            status: "error",
            message: "Invalid username/password"
        })
    }
    User.findOne({ username }, (error, user) => {
        if (error) return res.json({
            status: "error",
            message: "Error in finding user",
            error: error
        });
        if (!user) return res.json({
            status: "error",
            message: "No user found with this username ",
            error: "Check username"
        });
        
        user.comparePasswords(password, (error, isMatch) => {
            if (error) return res.json({
                status: "error",
                message: "Error in comparision",
                error: error
            });
            if (!isMatch) return res.json({
                status: "error",
                message: "Invalid credentials",
                error: "Invalid credentials"
            });

            const signUserToken = { username };
            const token = jwt.sign(signUserToken, process.env.JWT_TOKEN_SECRET);
            req.header['Authorization'] = `Bearer ${token}`;
            return res.redirect('/swcanc/send');

        })

    })
});

//Sending Route
app.get('/swcanc/send',checkAuth, (req, res) => {
    res.render('home');
})
app.post("/swcanc/send",checkAuth, (req, res) => {
	const { mod_anc, type } = req.body;
	if (mod_anc === '' || !type) {
		return res.json({
			status: "error",
			error: "Empty fields/Invalid fields",
			message: "Empty fields/Invalid fields"
		})
	}
	try {
		anc.execute(mod_anc, type);
		res.redirect("/swcanc/success");
	} catch (error) {
		console.log(error);
		res.json({
			info: "Some error occurred",
			error: error,
		});
	}
});

//Logout Route
app.get('/swcanc/logout', checkAuth, (req, res) => {
    const randomString = crypto.randomBytes(10).toString('hex');
    req.header['Authorization'] += randomString;
    res.redirect('/swcanc/login');
});


//Success Route
app.get("/swcanc/success",checkAuth,  (req, res) => {
	res.render("success");
});
//Restart Route
app.get("/swcanc/rs",checkAuth, (req, res) => {
	res.redirect("/swcanc");
	process.exit(1);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
