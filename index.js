require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./database/connection');
const expressSession = require('express-session');
const productController = require('./controller/productController')
const methodOverride = require('method-override');

const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute')

const app = express();
connectDB();
app.use(methodOverride('_method'));


app.set('view engine', 'ejs');
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/vendor', express.static(path.resolve(__dirname, 'assets/vendor')));
const PORT = process.env.PORT || 3000;

global.loggedIn = null;
global.checkIdUser = null;
global.userDetail = null;
global.allUser = [];


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

app.get('/', productController.showProductHome);


app.use('/user', userRouter)
app.use('/', productRouter)

app.listen(PORT, () => {
  console.info(`Server is running at port: http://localhost:${PORT}`);
})