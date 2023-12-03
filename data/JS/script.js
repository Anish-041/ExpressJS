const { json } = require("express");
let fs=require("fs");
let path=require("path");
let filepath=path.join(__dirname,"..","todo","todo.js");

class todo{
    // FETCHING THE UPDATED DATA
    static getData(){
        return new Promise((resolve,reject)=>{
            fs.readFile(filepath,{encoding:"utf-8"},(err,data)=>{
                if(err) return reject(err.message);
                if(data.length==0){
                    resolve("No task found");
                }
                else{
                    resolve(JSON.parse(data));
                }
            })
        })
    }

    // CREATING NEW DATA
    static writeData(value){  
    return new Promise((resolve,reject)=>{
        fs.readFile(
            filepath,
            {
                encoding:"utf-8"
            },
            (err,data)=>{
                if(err) return reject(err.message);
               if(data.length==0){
                data=[]
               }else{
                data=JSON.parse(data);
               }
                
                data.push(value);
                fs.writeFile(
                    filepath,
                    JSON.stringify(data),
                    (err)=>{
                        if(err) return reject(err.message);
                        resolve("task added successfully");
                    }
                )
                
            }
       
           ) 
    })
   }

   // FOR DELETING THE DATA
    static deleteData(index) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8",
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length == 0) {
                        resolve("No tasks to delete");
                    } else {
                        data = JSON.parse(data);

                        if (index < 0 || index >= data.length) {
                            return reject("Invalid index");
                        }

                        data.splice(index, 1);

                        fs.writeFile(
                            filepath,
                            JSON.stringify(data),
                            (err) => {
                                if (err) return reject(err.message);
                                resolve("Task deleted successfully");
                            }
                        );
                    }
                }
            );
        });
    }

    // FOR UPDATING THE DATA
    static editData(index, newValue) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                filepath,
                {
                    encoding: "utf-8"
                },
                (err, data) => {
                    if (err) return reject(err.message);
                    if (data.length == 0) {
                        resolve('No task to update');
                    } else {
                        data = JSON.parse(data);

                        if (index < 0 || index >= data.length) {
                            return reject("Invalid Index");
                        }
                    }
                    data[index] = newValue;

                    fs.writeFile(
                        filepath,
                        JSON.stringify(data),
                        (err) => {
                            if (err) return reject(err.message);
                            resolve("Task Edited Successfully");
                        }
                    )
                }
            )
        })
    }
}

module.exports = todo;