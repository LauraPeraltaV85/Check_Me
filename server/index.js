const express = require('express')
const axios = require('axios')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const lod = 'southcentralus.api.cognitive.microsoft.com';
const key = 'e550a95f3f2f4d028784ac6273cc330b'

const base_instance_options = {
    baseURL: `https://${loc}/face/v1.0`,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Suscription-Key': 'fe9361ea-9cf2-41a4-a8bb-281ea3334682' 
    }
}

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

app.post('/update', (req,res)=>{
    Employee.findByIdAndUpdate(req.body.id, {
        email:req.body.email,
        pass:req.body.pass,
        picture:req.body.picture
    }).then(data=>{
        console.log(data)
        res.send(data)
    }).catch(err=>{
        console.log(err)
    })
})

app.listen(3000, ()=>{
    console.log('server running')
})
