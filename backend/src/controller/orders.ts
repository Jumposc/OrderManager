import {OrderData} from '../interface/OrderData'
import fs = require('fs')

export function addOrder(order:OrderData,callback:Function){
    readData((err,data)=>{
        if(err){
            callback(err);
        }
        let db = JSON.parse(data);
        let orderList:OrderData[] = db.listData;
        order.id = db.nextId++;
        orderList.push(order);
        writeData(JSON.stringify(db,null,'\t'),(err:NodeJS.ErrnoException)=>{
            if(err){
                callback(err);
            }
            callback(null,'添加成功');
        })
    })  
}

export function getOrderList(page:number,pageSize:number,callback:Function){
    readData((err:NodeJS.ErrnoException,data:string)=>{
        if(err){
            callback(err);
        }
        let db = JSON.parse(data);
        let json = {
            listData:db.listData.slice(page * pageSize,page*pageSize + pageSize),
            total:db.listData.length}
        callback(null,json);
    })
    
}

export function modifyOrder(order:OrderData,callback:Function){
    readData((err:NodeJS.ErrnoException,data:string)=>{
        if(err){
            callback(err);
        }
        let db = JSON.parse(data);
        let index = db.listData.findIndex((v: OrderData)=> v.id===order.id);
        if(index){
            db.listData[index] = order;
            writeData(JSON.stringify(db,null,'\t'),(err:NodeJS.ErrnoException)=>{
                if(err){
                    callback(err);
                }
                callback(null,'成功修改')
            })
        }else{
            callback(null,'没有此订单');
        }
    })
}

export function deleteOrder(id:number,callback:Function){
    readData((err:NodeJS.ErrnoException,data:string)=>{
        if(err){
            callback(err);
        }
        let db = JSON.parse(data);
        let index = db.listData.findIndex((v: OrderData)=> v.id===id);
        if(index){
            db.listData.splice(index,1);
            writeData(JSON.stringify(db,null,'\t'),(err:NodeJS.ErrnoException)=>{
                if(err){
                    callback(err);
                }
                callback(null,'成功删除')
            })
        }else{
            callback(null,'没有此订单');
        }
    })
}

function writeData(data:string,callback:Function){
    fs.writeFile(`${process.cwd()}/data/data.json`,data,(err)=>{
        if(err){
            callback(err);
        }
        callback(null,'写入成功');
    })
}

function readData(callback:Function){
    fs.readFile(`${process.cwd()}/data/data.json`,"utf-8",(err,data)=>{
        if(err){
            callback(err)
            return;
        }
        callback(null,data)
    })
}