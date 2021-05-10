require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = checkAuth = (req, res, next) => {
	const authHeader = req.header["Authorization"];
	if (!authHeader) {
		return res.redirect("/swcanc/login");
	} else {
		const token = authHeader.split(" ")[1];
		if (token == null) {
			return res.redirect("/swcanc/login");
		} else {
			jwt.verify(token, process.env.JWT_TOKEN_SECRET, (error, user) => {
				if (error) {
					return res.redirect("/swcanc/login");
				}
				req.user = user;
				next();
			});
		}
	}
};
