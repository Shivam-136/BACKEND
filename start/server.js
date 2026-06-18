const express = require("express");

const app = express();

app.checkoutget("/test",(req , res)=>{
    res.send("ok me tumhara server hu")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})