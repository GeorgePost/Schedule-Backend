const express= require("express");
const router= express.Router();
const { getDb } = require('../../db');
const dotenv = require('dotenv');
dotenv.config()
router.all("/",  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
router.get("/",async (req,res)=>{
    if(req.body.password===process.env.ALLUSERKEY){
        const db=await getDb();
        users= await db.collection('schedule').find().toArray()
        res.json(users);
    }else{
        res.status(409)
    }
    
})
router.get("/:email",async (req,res)=>{
    const db=await getDb();
    const user=await db.collection('schedule').findOne({email:String(req.body.email).toLocaleLowerCase()})
    if(user){
        res.json(user)
    }else{
        res.sendStatus(404);
    }
})
router.post("/",async (req,res)=>{
    const db=await getDb();
    const user=await db.collection('schedule').findOne({email:String(req.body.email).toLocaleLowerCase()})
    if(user){
        return res.sendStatus(400);
    }
    const newUser={
        name:String(req.body.name),
        email:String(req.body.email).toLocaleLowerCase(),
        P1:"P1",
        P2:"P2",
        P3:"P3",
        P4:"P4",
        admin:false,
    }
    db.collection('schedule').insertOne({
        name:String(req.body.name),
        email:String(req.body.email).toLocaleLowerCase(),
        P1:"P1",
        P2:"P2",
        P3:"P3",
        P4:"P4",
        admin:false,
    })
    res.json(newUser)
})
router.put("/:email",async (req,res)=>{
    const db=await getDb();
    const user=await db.collection('schedule').findOne({email:String(req.params.email).toLocaleLowerCase()})
    if(user){
        const updates=req.body
        const updateUser={...user,
            name:updates.name ? updates.name : user.name,
            P1:updates.P1? updates.P1 : user.P1,
            P2:updates.P2 ? updates.P2 :user.P2,
            P3:updates.P3? updates.P3 : user.P3,
            P4:updates.P4 ? updates.P4 :user.P4,
        }
        await db.collection('schedule').updateOne( { email:String(req.params.email).toLocaleLowerCase() }, 
        { $set: { 
            name:updates.name ? updates.name : user.name,
            P1:updates.P1? updates.P1 : user.P1,
            P2:updates.P2 ? updates.P2 :user.P2,
            P3:updates.P3? updates.P3 : user.P3,
            P4:updates.P4 ? updates.P4 :user.P4,
        } } )
        res.json(updateUser)
    }else{
        res.sendStatus(404);
    }
    
})
router.delete("/:email",async (req,res)=>{
    const db=await getDb();
    const user=await db.collection('schedule').findOne({email:String(req.body.email).toLocaleLowerCase()})
    if(user){
        db.schedule.deleteOne({email:String(req.body.email).toLocaleLowerCase()})
        res.json({
            msg:"User Deleted",
        })
    }else{
        res.sendStatus(400);
    }
})
module.exports= router;
