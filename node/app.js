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
    "origin": ['http://localhost:8001','http://localhost:8080'],
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
        case 'milkcart':
            console.log(req.body.userID,"232432qqq")
            var sql2 = `SELECT milkbuyitem FROM USER WHERE username="${req.body.userID}"`
            db.query(sql2,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log(data[0].milkbuyitem,"bulala")
                    if(data[0].milkbuyitem){
                        var obj = JSON.parse(data[0].milkbuyitem);
                        if(obj[req.body.pid]){
                            obj[req.body.pid]++;
                        }else{
                            obj[req.body.pid]=1;
                        }
                    }else{
                        var obj = {};
                        obj[req.body.pid]=1
                    }
                    // console.log(obj)
                    // console.log(req.body.pid)
                    var str = JSON.stringify(obj);
                    // console.log(typeof str)
                    let sql3 =`update user set milkbuyitem='${str}' where username="${req.body.userID}"`;
                    db.query(sql3,(err,data)=>{
                        if(err){
                            console.log("cen")
                        }else{
                            console.log("secce")
                            res.send(data)
                        }
                    })
                }
            })
            break;
        case "getmilkcart":
            var sql4 = `SELECT milkbuyitem FROM USER WHERE username="${req.body.userID}"`;
            db.query(sql4,(err,data)=>{
                if(err){
                    // console.log(err)
                }else{
                    // console.log(data,9999)
                    res.send(data);
                }
            })
            break;
        case 'addmilk':
            console.log(req.body.userID,"232432qqq")
            var sql2 = `SELECT milkbuyitem FROM USER WHERE username="${req.body.userID}"`
            db.query(sql2,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    // console.log(data[0].milkbuyitem,"guaguagua");
                    var obj = JSON.parse(data[0].milkbuyitem);
                    console.log(obj,"guwerewr3342");
                    for(var key in obj){
                        if(key==req.body.pid){
                            obj[key]++
                        }
                    }
                    // console.log(obj,"guwerewr3342");
                    var str = JSON.stringify(obj)
                    console.log(str)
                    let sql3 =`update user set milkbuyitem='${str}' where username="${req.body.userID}"`;
                    db.query(sql3,(err,data)=>{
                        if(err){
                            console.log("cen")
                        }else{
                            // console.log(data)
                            res.send(data);
                        }
                    })
                }
            })
            break;
        case 'minusmilk':
            console.log(req.body.userID,"232432qqq")
            var sql2 = `SELECT milkbuyitem FROM USER WHERE username="${req.body.userID}"`
            db.query(sql2,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    // console.log(data[0].milkbuyitem,"guaguagua");
                    var obj = JSON.parse(data[0].milkbuyitem);
                    console.log(obj,"guwerewr3342");
                    for(var key in obj){
                        if(key==req.body.pid){
                            if(obj[key]<=1){
                                obj[key]=1;
                            }else{
                                obj[key]--;
                            }
                        }
                    }
                    // console.log(obj,"guwerewr3342");
                    var str = JSON.stringify(obj)
                    console.log(str)
                    let sql3 =`update user set milkbuyitem='${str}' where username="${req.body.userID}"`;
                    db.query(sql3,(err,data)=>{
                        if(err){
                            console.log("cen")
                        }else{
                            console.log("secce")
                            res.send("success")
                        }
                    })
                }
            })
            break;
        case 'delmilk':
            console.log(req.body.userID,"232432qqq")
            var sql2 = `SELECT milkbuyitem FROM USER WHERE username="${req.body.userID}"`
            db.query(sql2,(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    // console.log(data[0].milkbuyitem,"guaguagua");
                    var obj = JSON.parse(data[0].milkbuyitem);
                    console.log(obj,"guwerewr3342");
                    for(var key in obj){
                        if(key==req.body.pid){
                            delete obj[key]
                        }
                    }
                    // console.log(obj,"guwerewr3342");
                    var str = JSON.stringify(obj)
                    console.log(str)
                    let sql3 =`update user set milkbuyitem='${str}' where username="${req.body.userID}"`;
                    db.query(sql3,(err,data)=>{
                        if(err){
                            console.log("cen")
                        }else{
                            console.log("secce")
                            res.send(data)
                        }
                    })
                }
            })
            break;
    }
    
});
app.use('/milkgoods',(req,res)=>{
    //res.send('lalala');
    db.query(`SELECT * FROM milkgoods`,(err,data)=>{
        // console.log(data)
        // console.log(err);
        if(err){
            res.send('mysql err');
        }else{
            console.log(req.body.act)
            if(req.body.act){
                var arr = [];
                var obj = {};
                if(req.body.data){
                    obj=JSON.parse(req.body.data);
                }
                console.log(typeof obj)
                console.log(obj)
                data.forEach((val,key)=>{
                    if(val.type==req.body.act){
                        arr.push(val)
                    }else if(val.pid==req.body.act){
                        arr.push(val)
                    }else if(req.body.act=="getmilkcart"){
                        // console.log(obj);
                        for(var key in obj){
                            if(key==val.pid){
                                // console.log(key,344343);
                                val["num"]=obj[key];
                                arr.push(val);
                            }
                        }
                    }
                    
                })
                console.log(arr)
                res.send(arr)
            }else{
                // console.log(req.body.act,39824928359)
                // console.log("bulal")
                res.send(data)
            }
            
        }
    });
});