const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./employee')

app.use(bodyParser.json())

//password = QMYa4AQcA1zkSs1j
const Employee = mongoose.model('employee')
const mongoUri = 'mongodb+srv://lp:QMYa4AQcA1zkSs1j@employeeapp-4bq98.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected', ()=>{
    console.log('connected to mongo')
})

mongoose.connection.on('error', (err)=>{
    console.log('error', err)
})
app.get('/',(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/send-data',(req,res)=>{
    const employee = new Employee({
        email:req.body.email,
        pass:req.body.pass,
        picture:req.body.picture
    })
    employee.save().then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.post('/delete', (req,res)=>{
    Employee.findByIdAndRemove(req.body.id)
    .then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

// app.post('/update', (req,res)=>{
//     Employee.findByIdAndUpdate(req.body.id, {
//         email:req.body.email,
//         pass:req.body.pass,
//         picture:req.body.picture
//     }).then(data=>{
//         console.log(data)
//         res.send(data)
//     }).catch(err=>{
//         console.log(err)
//     })
// })

app.listen(3000, ()=>{
    console.log('server running')
})

  //  "email":"lpv@lpv.com",
    //"phone":"12345",
   // "picture":"some url",