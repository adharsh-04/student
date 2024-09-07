const exp=require('express');
const userapi=exp.Router();

//testing route
userapi.get('/test',(req,res)=>{
    res.send("request from userapi")
})

module.exports=userapi;