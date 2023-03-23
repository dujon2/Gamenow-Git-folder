const router = require("express").Router();//creating router handles endpoints and the way clients 
                                         //request are dealt with ie. cdlicking home button = 'blah.com/hom'
const User = require("../models/User");

const bcrypt = require("bcrypt");//encrpts passwords

//REGISTER if router.post = sending data out ie sending it to the database
router.post("/register", async (req,res) => {
  

    try{
        //generate new password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //create new user
        const newUser = new User({ //creates new user and adds them to the database 
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

    //saves user and respond
        const user = await newUser.save();
        res.status(200).json(user); //sends json respons
    } catch(err){
        res.status(500).json(err); 
    }
});


//LOGIN
router.post("/login", async (req,res)=>{

    try{
        const user = await User.findOne({email: req.body.email});//searches the use db to find a email mathcing the one entered
        !user && res.status(404).json("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password);//compares the user's password with the one entered
        !validPassword && res.status(400).json("password is incorrect")

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json(err);
    }
})


module.exports =router