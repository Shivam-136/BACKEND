const express = require("express")

const app = express()

app.get("/test",(req, res)=>{
  res.send("okk me tumhara server hu")
}) 

app.listen(3000, ()=>{
  console.log("server is running on port 3000")
})
