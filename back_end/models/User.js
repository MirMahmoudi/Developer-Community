const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema ({
            username : {
                type: String,
                required:  [ true , 'Please enter an user name' ],
            },
            email : {
                type: String,
                required:  [ true , 'Please enter an email' ],
                unique : true,
                validate : [ isEmail , 'Please enter a valid email' ],
            },
            password : {
                type: String,
                required:  [ true , 'Please enter a password' ],
                minlength: [6 , 'the password should be minimum 6 characters'], 
            },
           
}, {timestamps: true})




// fire a function befor doc saved to db
// Hash the passwoord
userSchema.pre('save' , async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password , salt)
    next();
})

// static method to login user
userSchema.statics.login = async function ( email , password){
const user = await this.findOne({ email })

if (user) {
const auth =  await bcrypt.compare(password, user.password)
if (auth) {
    return user;
}
throw Error ('incorect password')
}
throw Error ('incorect email')
}


const User = mongoose.model('user', userSchema);

module.exports = User;