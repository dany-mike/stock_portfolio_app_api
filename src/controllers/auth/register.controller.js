const User = require('../../models/User.model');
const validation  = require('../../utils/validation.util');
const bcrypt = require('bcryptjs');

async function register(req, res, next) {

    // Validation
    const validate = validation.registerValidation(req.body)

    if(validate.error) {
        res.rawStatus = 400
        res.rawResponse = validate.error.details[0].message
        return next();
    }

    // Check if the user is already in the db
    const isEmail = await User.findOne({email: req.body.email})

    if(isEmail) {
        res.rawStatus = 400
        res.rawResponse = "Email already exists"
        return next();
    }

    // Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        await user.save();
        res.rawStatus = 200;
        res.rawResponse = { user: user._id };
        return next()
    } catch(err) {
        res.rawStatus = 400
        res.rawResponse = err.message
        return next()
    }   
}

module.exports = register