const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		Date: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "users" }
);

UserModel.pre("save", async function save(next) {
	if (!this.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		return next();
	} catch (err) {
		return next(err);
	}
});

UserModel.methods.comparePasswords = function (userPassword, callback) {
	bcrypt.compare(userPassword, this.password, function (error, isMatch) {
		if (error) return callback(error);
		return callback(null, isMatch);
	});
}

const model = mongoose.model("UserModel", UserModel);
module.exports = model;
