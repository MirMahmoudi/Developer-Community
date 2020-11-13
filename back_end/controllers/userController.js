const User  = require('../models/User')
const jwt = require('jsonwebtoken')

//   handl errors
const handelErrors = (err) => {
    console.log(err.message , err.code)
    let errors = {username : '' , email : '' , password : ''}
 
 //    incorect email
 if(err.message === 'incorect email'){
     errors.email = 'that email is not registered'
 }
 // incorect password
 if(err.message === 'incorect password'){
     errors.password = 'that password is not corect'
 }
 // duplicate error code
 if(err.code === 11000){
     errors.email = 'that email is already registered'
     return errors;
 }
 
//  validtion the errors    
    if(err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({properties}) =>{
          console.log(properties.message)
          errors[properties.path] = properties.message;
    });
  }
  return(errors)
 }
 
 // create json web token
 const maxAge = 3 * 24 * 60 * 60 
 const createToken = (id) => {
     return jwt.sign({ id } , 'alaawedadramamoamir' , {expiresIn : maxAge })
 }
 


const login_get = (req,res)=>{
    res.send("log in")
}

const signup_get = (req,res)=>{
    res.send("sign up ")
}
// function get all users just for test 
// const getAllUsers = (req, res) => {
//       User.find ()
//          .then(result =>{
//              console.log(result)
//          })
//          .catch(err => res.send(err))
// }

const signup_post = async (req, res ) => {
        //   res.send(req.body)
       const { username , email , password } = req.body
       try {
           const user = await User.create({ username , email , password });
           const token = createToken(user._id)
           res.cookie('jwt' , token , { httpOnly : true , maxAge : maxAge * 1000 });
          res.status(201).json({user});
             
    }

    catch (err) {
        const errors = handelErrors (err)
        res.status(400).send({errors})
    }
   }
   


   const login_post = async (req, res ) => {
            
        const { email , password } = req.body
        console.log(req.body, "hallo")
        try {
            const user = await User.login( email , password)
            const token = createToken(user._id)
            res.cookie('jwt' , token , { httpOnly : true , maxAge : maxAge * 1000 });
            return req.session.user= user,
            res.status(201).json({user : user._id , userName : user.username})
            // res.send("logedin")
        }
        catch (err) {
            const errors = handelErrors (err)
            // console.log(errors)
            res.status(400).send({ errors })
        }   
}

const logout_get = (req, res ) => {
    res.cookie('jwt' , '' , {maxAge : 1})
    req.session.destroy((err) => {
        if(err) {
            console.log('Error logging out: ', err);
            return next();
        }
        res.json({ok : true})
     })
    // res.redirect('/')
 }
 




module.exports =  {
    login_get,
    signup_get,
    signup_post,
    login_post,
    logout_get,
    // getAllUsers
}


