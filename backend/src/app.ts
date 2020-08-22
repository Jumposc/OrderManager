import express = require('express');
import {getOrderList, addOrder, modifyOrder, deleteOrder} from './controller/orders'
import { OrderData } from './interface/OrderData';
const app = express();

const port = 8080;
const hostname = '127.0.0.1'
app.listen(port,()=>{
    console.log(`服务器启动于http://${hostname}:${port}`)
})


app.get('/getOrderList',(req,res)=>{
    getOrderList(parseInt(req.query.page.toString()),parseInt(req.query.pageSize.toString()),(err:NodeJS.ErrnoException,data:string)=>{
        if(err){
            res.statusCode = 500;
            res.send(err);
        }
        console.log(data);
        res.send(data);
    })
})

app.post('/addOrder',(req,res)=>{
    let order:OrderData = JSON.parse(req.query.order as string);
    addOrder(order,(err:NodeJS.ErrnoException,msg:string)=>{
        if(err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send({msg:msg})
    })
})

app.post('/modifyOrder',(req,res)=>{
    let order:OrderData = JSON.parse(req.query.order as string);
    modifyOrder(order,(err,msg)=>{
        if(err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send({msg:msg})
    })
})

app.post('/deleteOrder',(req,res)=>{
    let id = parseInt(req.query.id as string); 
    deleteOrder(id,(err:NodeJS.ErrnoException,msg:string)=>{
        if(err){
            res.statusCode = 500;
            res.send(err);
        }
        res.send({msg:msg});
    })
})
