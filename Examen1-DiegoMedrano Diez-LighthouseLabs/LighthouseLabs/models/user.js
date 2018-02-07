const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({

usuario:{
    type: String,
    required: true,
    trim: true    

},
mensaje:{
    type: String,
    required: true
}

});


const User = mongoose.model('User' , UserSchema);
module.exports = User;