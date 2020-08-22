import React from 'react';
import { OrderData } from '../interface/interface';

export class Database {

    static _instance: Database;
    static getInstance() {
        if (!this._instance) {
            this._instance = new Database();
        }
        return this._instance;
    }
    data: OrderData[];
    nextId: number;
    constructor() {
        this.data = [];
        this.nextId = 1;
    }

    getOrderList(page: number, pageSize: number, callback: Function) {
        setTimeout(() => {
            if (Math.random() < 0.2) {
                callback('获取订单，网络错误');
            }
            else {
                callback(null,
                    {
                        listData: this.data.slice(page * pageSize, page * pageSize + pageSize),
                        total: this.data.length
                    });
            }
        }
            , 1000);

    }

    addOrder(order: OrderData, callback: Function) {
        this.data.push({
            ...order,
            id: this.nextId++
        });
        setTimeout(() => {
            if (Math.random() < 0.2) {
                callback('网络错误');
            }
            else {
                callback(null, '添加成功');
            }
        }, 1000)
    }

    modifyOrder(order: OrderData, callback: Function) {
        this.data.forEach((v, i) => {
            if (v.id === order.id) {
                v = Object.assign(v, order);
            }
        })
        setTimeout(() => {
            if (Math.random() < 0.2) {
                callback('网络错误');
            } else {
                callback(null, '修改成功');
            }
        }, 1000)
    }

    deleteOrder(id: number, callback: Function) {
        this.data.forEach((v, i) => {
            if (v.id === id) {
                this.data.splice(i, 1);
            }
        })
        setTimeout(() => {
            if (Math.random() < 0.2) {
                callback('网络错误');
            }
            else {
                callback(null, '删除成功');
            }
        }, 1000)
    }

    getOrderById(id: number, callback: Function) {
        let order = this.data.find(v => v.id === id);
        setTimeout(() => {
            if (Math.random() < 0.2) {
                callback('网络错误');
            } else {
                callback(null, order);
            }
        }, 1000);
    }
}