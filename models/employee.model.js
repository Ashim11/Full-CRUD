const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({

        fullName:{
            type: String ,
            required: 'This field is required.'
        },
        email:{
            type: String,
            required: 'This field is required.'
        },
        mobile:{
            type: String,
            required: 'This field is required.'
        },
        city:{
            type: String,
            required: 'This field is required.'
        }
});

//custome validation for email 
employeeSchema.path('email').validate((val) =>{
    
    return emailRegex.test(val);
});

mongoose.model('Employee',employeeSchema);
