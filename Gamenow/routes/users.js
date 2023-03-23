const router = require("express").Router();//creating router handles endpoints and the way clients 
                                         //request are dealt with ie. cdlicking home button = 'blah.com/hom'
const bcrypt = require("bcrypt");
const res = require("express/lib/response");
const { resetWatchers } = require("nodemon/lib/monitor/watch");
const User = require("../models/User");

//update user
router.put("/:id", async(req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin ){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);//encrypting pword
                req.body.password = await bcrypt.hash(req.body.password, salt);//decrpts it
            }catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.body.userId, {
                $set:req.body,//automatically sets all in inside this body
            });
            res.status(200).json("Account has been updated")//200=succesful
        }catch (err){
            return res.status(500).json(err);
        }


    } else {
        return res.status(403).json("You can only update your account")
    }
})
//delete user
router.delete("/:id", async(req,res) =>{
    if(req.body.userId === req.params.id || req.body.isAdmin ){
       
        
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");   
        }catch (err){
         return res.status(500).json(err);
        }


    } else {
        return res.status(403).json("You can delete only your account")
    }
});
//get user
router.get("/", async (req,res) =>{
    const userId = req.query.userId;//req.query allowed me to search by username or id 
    const username = req.query.username;//i.e:localhost:8800/users?usernam=john
    try {
        const user = userId 
        ? await User.findById(userId)//searches for user by id
        : await User.findOne({username:username});//searches for user by username if id isnt present
        const { password, updatedAt, ...other} = user._doc;//user doc is the database object
        res.status(200).json(other)
    } catch (err) {
        res.status(500).json(err);
    }
})
//follow user
router.put("/:id/follow", async (req,res)=>{
    if(req.body.userId !== req.params.id){//if they arent the same user continue
        try{
            const user = await User.findById(req.params.id);//finds user we are trying to follow
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){//if current user is not folowing this user adds them to their followings and to the other users followes
                await user.updateOne({$push:{followers:req.body.userId } });
                await currentUser.updateOne({$push:{followings:req.params.id } })
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant follow yourself")
    }
})


//unfollow

router.put("/:id/unfollow", async (req,res)=>{
    if(req.body.userId !== req.params.id){//if they arent the same user continue
        try{
            const user = await User.findById(req.params.id);//finds user we are trying to follow
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){//if current user is not folowing this user adds them to their followings and to the other users followes
                await user.updateOne({$pull:{followers:req.body.userId } });
                await currentUser.updateOne({$pull:{followings:req.params.id } })
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you already follow this user")
            }

        }catch(err){
            res.status(500).json(err);
        }
    }else{
        res.status(403).json("You cant follow yourself")
    }
})



module.exports =router;//exports router