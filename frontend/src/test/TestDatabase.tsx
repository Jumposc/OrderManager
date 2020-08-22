// import {Database} from '../Database/Database'
// import { OrderListItemData } from '../Global/interface'

// for(let i = 0;i < 100;i++){
//     Database.getInstance().addOrder({
//         id:i,
//         date:'2020-08-01',
//         salesName:'xxx',
//         amount:2000,
//         detail:[
//             {
//                 name:'袜子',
//                 amount:5
//             },
//             {
//                 name:'鞋子',
//                 amount:5
//             },
//             {
//                 name:'洗衣服',
//                 amount:5
//             },
//         ]
//     },(err:null|string,msg:string)=>{console.log(msg)})
// }
// Database.getInstance().getOrderList(1,10,(err:null|string,data:OrderListItemData[])=>{
//     console.log(data);
// })

// Database.getInstance().modifyOrder({
//     id:1,
//     date:'2020-08-01',
//     salesName:'xxx',
//     amount:2000,
//     detail:[
//         {
//             name:'袜子',
//             amount:1
//         },
//         {
//             name:'鞋子',
//             amount:1
//         },
//         {
//             name:'洗衣服',
//             amount:1
//         },
//     ]
// },(err:null|string,msg:string)=>{
//     console.log(msg);
// })

// Database.getInstance().deleteOrder(20,(err:null|string,msg:string)=>{
//     console.log(msg);
// });

// Database.getInstance().getOrderList(0,10,(err:null|string,data:OrderListItemData[])=>{
//     console.log(data);
// })