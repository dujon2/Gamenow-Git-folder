const express = require("express");
const app = express();//nodejs framework server runs on express
const mongoose = require("mongoose");//helps make mongo models like  post
const dotenv = require("dotenv");//encrypt passwords and anything else that needs encryption
const helmet = require("helmet");//helmet protects header
const morgan = require("morgan");//request logging middleware
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const multer = require("multer");//multer is a middleware for uploading file

dotenv.config();//using dotenv create a .dotenv file this is where i place stuff i want encrypted

mongoose.connect(
    process.env.MONGO_URL,//URL in the dotenv file this connects us to the database
    { useNewUrlParser:true, useUnifiedTopology:true},
        ()=>
            {
                console.log("Connected to MongoDB");
            }
);

//middleware
app.use(express.json());//body parser for post request
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file, cb) => {
        cb(null, "public/images");
    },
    filename: (req,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{
        return res.status(200).json("File uploaded successfully");
    }catch(err){
        console.log("Error uploading file " + err)
    }
})

app.use("/api/users",userRoute);//I guess this set up the route and the users file then display what happens on that file to that route
app.use("/api/auth",authRoute);
app.use("/api/posts",postRoute);

app.listen(8800,()=>{
    console.log("Backend server is running!")
})