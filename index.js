const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.listen(3000, () =>{
    console.log('server is running at port 3000');
});



app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'emp'
});


connection.connect(function(error){
    if(!!error) console.log(error);
    else console.log('Database Connected!');
});

app.get('/',(req,res)=>{

    let sql = "SELECT * FROM employee";
    let query = connection.query(sql, (err, rows) => {
        if(err) throw err;
        res.render('user_index', {
            title : 'CRUD OPERATION',
        user : rows
    });
  
}); 
});

app.get('/add',(req,res) => {
    res.render('add_user', {
        title : 'CRUD OPERATION'
});
});

app.post('/save',(req,res)=>{
    let data = {firstname:req.body.firstname,lastname: req.body.lastname, email: req.body.email};
    let sql = "INSERT INTO employee SET ?";
    let query = connection.query(sql,data, (err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});


app.get('/edit/:userregistration_ID',(req,res)=>{
    const userregistration_ID = req.params.userregistration_ID;
    let sql = `Select * from employee where registration_ID
    = ${userregistration_ID}`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.render('edit_user',{
            title: 'CRUD OPERATION ',
            user : result[0]
        });
    });
});

app.post('/update',(req,res)=>{
    
    const  userregistration_ID= req.body.id;
    let sql = "update employee SET firstname='"+req.body.firstname+"',email='"+req.body.email+"',lastname='"+req.body.lastname+"'  where registration_ID ="+userregistration_ID;
    let query = connection.query(sql, (err,results)=>{
        if(err) throw err;
        res.redirect('/');
    });
});

app.get('/delete/:userregistration_ID',(req,res)=>{
    const userregistration_ID = req.params.userregistration_ID;
    let sql = `DELETE from employee where registration_ID= ${userregistration_ID}`;
    let query = connection.query(sql,(err, result)=>{
        if(err) throw err;
        res.redirect('/');
    });
});