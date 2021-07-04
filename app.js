const express = require("express");
const app = express();

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/contactData', { useNewUrlParser: true, useUnifiedTopology: true });

const path = require("path");
const port = 80;

// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});
const Contact = mongoose.model('Contact', contactSchema);

// express stuff
app.use('/static', express.static('static'));
app.use(express.urlencoded());

// pug specific stuff
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Endpoints
app.get('/', (req, res) => {
    const params = { };
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = { };
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("this item is not saved")
    })
    // res.status(200).render('contact.pug');
})

// start the server
app.listen(port, () => {
    console.log(`The application started succesfully on port 
    ${port}`)
})