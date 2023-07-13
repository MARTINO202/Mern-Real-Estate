require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = "Your mongoose connection string";

mongoose.connect('mongodb+srv://milla:erxQKUCTLN05Bc7X@cluster0.etdsmic.mongodb.net/', {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
mongodb+srv://ess:<password>@cluster0.g8gnpqy.mongodb.net/