// import React from 'react';
// import { render } from 'react-dom';
// import { Database } from '../Database/Database';
// import { OrderList } from '../OrderList/OrderList';
// import { EditPopup } from '../EditPopup/EditPopup';
// import { Pager } from '../Pager/Pager';
// import { OrderListItemData } from '../Global/interface';
// import '../style.less';




// export interface OrderManagerProps extends React.Props<any> {
//     pageSize: number
// }
// export interface OrderManagerState {
//     isEdit: boolean
//     editData: OrderListItemData
//     page: number
//     listData: OrderListItemData[]
//     total: number
// }

// class OrderManager extends React.Component<OrderManagerProps, OrderManagerState>{

//     state: OrderManagerState

//     constructor(props: OrderManagerProps) {
//         super(props);
//         this.state = {
//             isEdit: false,
//             editData: {
//                 id: 0,
//                 date: '',
//                 salesName: '',
//                 amount: 0,
//                 detail: [
//                     {
//                         name: '',
//                         amount: 0
//                     }
//                 ]
//             },
//             page:0,
//             total:0,
//             listData:[]
//         }
//         Database.getInstance().getOrderList(0, this.props.pageSize,
//             (err: null | string, data: { listData: OrderListItemData, total: number }) => {
//                 this.setState(Object.assign(this.state, data))
//             })
//     }

//     render() {
//         return (
//             <div className='OrderManager'>
//                 <div className="top">
//                     <div className="title">订单管理</div>
//                     <button className="add">增加新订单</button>
//                 </div>
//                 <OrderList listData={this.state.listData} ></OrderList>
//                 <Pager page={this.state.page} pageSize={this.props.pageSize} total={this.state.total} ></Pager>
//             </div>

//         )
//     }


// }

// render(
//     <OrderManager pageSize={10} />,
//     document.querySelector('body')
// )