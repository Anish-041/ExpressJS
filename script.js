const express = require("express");
const app = express();
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.use(express.json())
let todo = require("./data/JS/script");
app.use(express.static(path.join(__dirname,"static")))
// let todos=[]

// for fetching the data
app.get("/getTodo",async (req,res)=> {
    // res.send(todos);
    try {
     let data=  await todo.getData();
     res.send(data);
    }
    catch(error) {
        res.send(error);
    }
})

// for creating or adding new data
app.post("/addTodo", async (req,res) => {
    let {name}=req.body;
    try{
    let response=await todo.writeData(name);
    res.send(response);  
    }
    catch(err){
        res.send(err.message)
    }
})

// for deleting the data
app.delete("/deleteTodo/:index", async (req, res) => {
    let index = parseInt(req.params.index, 10);
    try {
      let response = await todo.deleteData(index);
      res.send(response);
    } catch (err) {
      res.send(err.message);
    }
  });

// for editing or updating the data
app.put("/editTodo/:index", async (req,res) => {
    let index = parseInt(req.params.index, 10);
    let {newValue} = req.body;
    try {
        let response = await todo.editData(index,newValue);
        res.send(response);
    } catch (error) {
        res.send(error.message);
    }
})

app.listen(4000,()=>{
    console.log("server started");
})