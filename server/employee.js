const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    email:String,
    pass:String,
    picture:String
})

mongoose.model('employee', EmployeeSchema)