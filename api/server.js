const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const http = require('http');

const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server, {
  cors: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PATCH', "DELETE"]
})


mongoose.connect(process.env.MONGO_URL).then(() => {
console.log("Connected to Database")
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err)
})


// db connecting       classList2023
//mongoose.set('strictQuery', false)
//mongoose.connect('mongodb+srv://kelvin:pUvwqFapyoZqmYPH@cluster0.0fs7iid.mongodb.net/');


const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const imageRoutes = require('./routes/imageRoutes');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/images', imageRoutes);





server.listen(8080, ()=> {
  console.log('server running at port', 8080)
})


