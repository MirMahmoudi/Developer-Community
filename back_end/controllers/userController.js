const  User  = require("../models/User")
const jwt = require('jsonwebtoken')
const moment = require('moment')

const { checkUser } = require('../middleware/middleware');
const { response } = require("express");


/////// sign up & login /////////////

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // incorrect email 
    if(err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }
     // incorrect password 
    if(err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
    });
    }
    return errors;
}
// create json web token
const maxAge = 30 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'net ninja secret', {
    expiresIn: maxAge
    });
};

/////////////// controller actions ///////////////////

const getSignupPage = (req, res) => {
    res.render('auth');
}

const getLoginPage = (req, res) => {
    res.render('auth');
}

const postSignupPage = async (req, res) => {
    const { username, email, password} = req.body;
    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

const postLoginPage = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}


const getLogOutPage = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};


module.exports ={
    getSignupPage,
    getLoginPage,
    postLoginPage,
    postSignupPage,
    getLogOutPage,
}