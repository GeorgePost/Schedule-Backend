const express= require("express");
const router= express.Router();
let users= require("../../Users");
const { v4: uuidv4 } = require("uuid");
router.all("/",  function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
router.get("/",(req,res)=>{
    res.json(users);
})
router.get("/:email",(req,res)=>{
    const found=users.some((user)=>user.email==String(req.params.email).toLocaleLowerCase())
    if(found){
        res.json(users.filter(user=>user.email===req.params.email))
    }else{
        res.sendStatus(404);
    }
})
router.post("/",(req,res)=>{
    const newUser={
        id: uuidv4(),
        name:String(req.body.name),
        email:String(req.body.email).toLocaleLowerCase(),
        P1:"P1",
        P2:"P2",
        P3:"P3",
        P4:"P4",
        admin:false,
    }
    if(!newUser.name || !newUser.email){
        return res.sendStatus(400);
    }
    users.push(newUser);
    res.json(newUser);
})
router.put("/:email",(req,res)=>{
    const found=users.some((user)=>user.email==String(req.params.email).toLocaleLowerCase());
    if(found){
        const updateUser= req.body;
        users.forEach(user=>{
            if(user.email==String(req.params.email).toLocaleLowerCase()){
                user.name=updateUser.name ? updateUser.name : user.name;
                user.P1=updateUser.P1? updateUser.P1 : user.P1;
                user.P2=updateUser.P2 ? updateUser.P2 :user.P2;
                user.P3=updateUser.P3? updateUser.P3 : user.P3;
                user.P4=updateUser.P4 ? updateUser.P4 :user.P4;
                res.json({msg:"User Found",user})
            }
        });
    }else{
        res.sendStatus(400);
    }
})
router.delete("/:email",(req,res)=>{
    const found=users.some((user)=>user.email===String(req.params.email).toLocaleLowerCase());
    if(found){
        users=users.filter((user)=>user.email!==String(req.params.email).toLocaleLowerCase());
        res.json({
            msg:"User Deleted",
        })
    }else{
        res.sendStatus(400);
    }
})
module.exports= router;
