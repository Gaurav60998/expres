const express = require('express');
const employee = require('./empData.json');

const fs = require('fs');
const { json } = require('stream/consumers');
const { error } = require('console');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("home page");
})

app.get('/about',(req,res)=>{
    res.send("about page");
})

app.get('/showEmp',(req,res)=>{
    res.json(employee);
})

app.get('/emp/:id',(req,res)=>{
    const id=Number(req.params.id);
    const emp=employee.find((e)=>e.id===id);
    res.json(emp)
})

app.post('/addEmp',(req,res)=>{
    const new_emp =req.body
    console.log(new_emp);
    employee.push(new_emp);
    fs.writeFile('./empData.json',JSON.stringify(employee),(error)=>{
        if (error) {
            res.send("error");
        } else {
            res.send("new employee add");
        }
    })
})

app.put('/updateEmp/:id',(req,res)=>{
    const id=Number(req.params.id);
    const emp=req.body
    const empIndex=employee.findIndex((e)=>e.id===id);
    if (empIndex!= -1) {
        employee[empIndex]=emp;
        fs.writeFile('./empData.json',JSON.stringify(employee),(error)=>{
            if (error) {
                res.send("error found")
            } else {
                res.send("updated employee")
            }
        })
    } else {
        res.send("employee not found")
    }

})

app.delete('/deletEmp/:id',(req,res)=>{
    const id=Number(req.params.id);
    const emp=req.body
    const empIndex=employee.findIndex((e)=>e.id===id);
    if (empIndex!= -1) {
        employee.splice(empIndex,1);
        fs.writeFile('./empData.json',JSON.stringify(employee),(error)=>{
            if (error) {
                res.send("error found")
            } else {
                res.send("delete employee")
            }
        })
    } else {
        res.send("employee not found")
    }

})
app.listen(4000,()=>{
    console.log("sun raha hu");
})