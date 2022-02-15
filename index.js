require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./database/connection');
const expressSession = require('express-session');

const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute')

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
const PORT = process.env.PORT || 3000;

global.loggedIn = null;
global.userDetail = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressSession({
  secret: 'sinhhuy'
}))

app.use('*', (req, res, next) => {
  loggedIn = req.session.userId;
  next();
})


app.use('/user', userRouter)
app.use('/shop', productRouter)

app.listen(PORT, () => {
  console.info(`Server is running at port: http://localhost:${PORT}`);
})