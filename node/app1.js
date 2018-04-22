const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const cookieSession = require('cookie-session');
const mysql = require('mysql');
const cors = require('cors');

const app = express();//服务器环境
//监听
app.listen(8003,()=>{console.log('app is running...')});
//静态页面托管
app.use(express.static('./src'));
app.use(cors({
    "origin": ['http://localhost:8080'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders:['Content-Type', 'Authorization']
}));

let db = mysql.createPool({
    host:'localhost',//库地址，主机名
    port:3306,//端口，可选参数
    database:'test',
    user:'root',
    password:'chenhongnan'
});


app.use(bodyParser());

var n = 1;
app.use('/user',(req,res)=>{
    //res.send('lalala');
    var sql = `SELECT * FROM USER WHERE username="${req.body.userID}"`
    console.log(req.body,32532543543);
    // console.log(sql);
    switch(req.body.act){
        case 'reg':
            console.log('1');
            console.log(sql,111);
            db.query(sql,(err,data)=>{
                
                console.log(data);
                if(err){
                    res.send('0');
                }else{
                    console.log('1');
                    if(data.length){
                        res.send('1');
                    }else{
                        let sql=`INSERT INTO user(username,password) VALUES("${req.body.userID}","${req.body.password}")`;
                        db.query(sql,(err,data)=>{
                            res.send('2');
                        })
                    }
                }
            });
            break;
        case 'login':
            console.log('2');
            let sql1 = `SELECT * FROM USER WHERE username="${req.body.userID}" AND password="${req.body.password}"`;
            db.query(sql1,(err,data)=>{
                console.log(sql1);
                console.log(data);
                if(err){
                    res.send('1');
                }else{
                    if(data.length){
                        res.send('2');
                    }else{
                        res.send('0')
                    }
                }
            })
            break;
        case 'cart':
            console.log(req.body,"1122321")
            var sql2 = `SELECT * FROM USER WHERE username="${req.body.userID}"`
            db.query(sql2,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(typeof req.body.pid)
                    console.log(req.body.pid)
                    let sql3 =`update user set buyitem='${req.body.pid}' where username="${req.body.userID}"`;
                    db.query(sql3,(err,data)=>{
                        if(err){
                            console.log("cen")
                        }else{
                            console.log("secce",23445)
                            res.send("123");
                        }
                    })
                }
            })
            break;
        case "getcart":
            var sql4 = `SELECT buyitem FROM USER WHERE username="${req.body.userID}"`;
            db.query(sql4,(err,data)=>{
                if(err){
                    // console.log(err)
                }else{
                    // console.log("data")
                    res.send(data);
                }
            })
            break;
    }
    
});

app.use('/goodslist',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM goodslist`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            res.send(data);
        }
    });
});

app.use('/hotgoods',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM hotgoods`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            res.send(data);
            console.log('111')
        }
    });
});

app.use('/disgoods',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM disgoods`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            res.send(data);
        }
    });
});

app.use('/newgoods',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM newgoods`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            res.send(data);
        }
    });
});

app.use('/gooddetail',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM gooddetail`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            res.send(data);
        }
    });
});


