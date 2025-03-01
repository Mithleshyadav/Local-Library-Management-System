const express = require('express');
const app = express();
app.use(express.json());
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const morgan = require('morgan');

const connectToDb = require('./dbcloudConfig/db');
connectToDb();



const userRoutes = require('./routes/user.routes');

const cookieParser = require('cookie-parser');
app.use(cookieParser());
const fileUpload = require('express-fileupload');


const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: 'tmp'
})
);

const cloudinaryConnect = require('./dbcloudConfig/cloudinary');
cloudinaryConnect();

app.get('/', (req,res)=>{
  res.send("Welcome to Express Web App ")
});

const bookRoutes = require('./routes/book.routes');
const transactionRoutes = require('./routes/transaction.routes');

app.use('/users', userRoutes);
app.use('/api/v1/book', bookRoutes );
app.use("/api/v1/transaction", transactionRoutes);

app.listen(PORT, ()=>{
  console.log(`Server is running at PORT: ${PORT}`);
});

module.exports = app;