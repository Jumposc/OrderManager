import React from 'react';
import { render } from 'react-dom';
import { OrderList } from './OrderList/OrderList';
import { OrderData } from './interface/interface';
import { Database } from './Database/Database';
import { Pager } from './Pager/Pager';
import { EditPopup } from './EditPopup/EditPopup';
import './style.less'

export interface OrderManagerProps extends React.Props<any> {
    pageSize: number
}
export interface OrderManagerState {
    isEdit: boolean
    editData: OrderData
    page: number
    listData: OrderData[]
    total: number
    isLoading:boolean
}

class OrderManager extends React.Component<OrderManagerProps, OrderManagerState>{

    state: OrderManagerState

    constructor(props: OrderManagerProps) {
        super(props);
        this.state = {
            isEdit: false,
            editData: {
                id: 0,
                date: '',
                salesName: '',
                amount: 0,
                detail: [
                    {
                        name: '',
                        amount: 0
                    }
                ]
            },
            page: 0,
            total: 0,
            listData: [],
            isLoading:true
        }
        this.refreshListData();
    }

    render() {
        return (
            <div className='OrderManager'>
                <div className="top">
                    <div className="title">订单管理</div>
                    <button className="add" onClick={() => this.onClickAddBtn()}>增加新订单</button>
                </div>
                <OrderList listData={this.state.listData} onClickListItemDelete={this.onClickListItemDelete.bind(this)}
                    onClickListItemModify={this.onClickListItemModify.bind(this)} isLoading={this.state.isLoading}>
                        
                    </OrderList>
                <Pager page={this.state.page} pageSize={this.props.pageSize} total={this.state.total} onClickPageBtn={this.onClickPageBtn.bind(this)}></Pager>
                <EditPopup data={this.state.editData} isShow={this.state.isEdit} onClickEditClose={this.onClickEditClose.bind(this)}
                    onClickEditSave={this.onClickEditSave.bind(this)} />
            </div>

        )
    }

    onClickAddBtn() {
        this.resetEditData(true);
    }

    onClickEditSave(order: OrderData) {
        this.resetLoading(true);
        //判断有没有这个订单
        Database.getInstance().getOrderById(order.id, (err: string | null, data: OrderData) => {
            if (err) {
                console.log(err);
                this.onClickEditSave(order);
                return;
            }
            //修改订单或添加订单
            if (data && data.id === order.id) {
                Database.getInstance().modifyOrder(order, (err: string | null, msg: string) => {
                    if (err) {
                        console.log(err);
                        this.onClickEditSave(order);
                        return;
                    }
                    console.log(msg);
                    this.refreshListData();
                })
            }
            else {
                Database.getInstance().addOrder(order, (err: string | null, msg: string) => {
                    if (err) {
                        console.log(err);
                        this.onClickEditSave(order);
                        return;
                    }
                    console.log(msg);
                    this.refreshListData();
                })
            }
        })
        this.resetEditData(false);

    }

    onClickEditClose() {
        this.resetEditData(false);
    }

    onClickListItemModify(id: number) {
        this.resetLoading(true);
        Database.getInstance().getOrderById(id, (err: string | null, order: OrderData) => {
            if (err) {
                console.log(err);
                this.onClickListItemModify(id);
                return;
            }
            let newDetail = order.detail.map(v => Object.assign({}, v));
            this.setState(Object.assign(this.state, {
                editData: {
                    ...order,
                    detail: newDetail
                },
                isEdit: true,
                isLoading:false
            }))

        })
    }

    onClickListItemDelete(id: number) {
        this.resetLoading(true);
        Database.getInstance().deleteOrder(id, (err: null | string, msg: string) => {
            if (err) {
                console.log(err)
                this.onClickListItemDelete(id);
                return;
            }
            console.log(msg);
            this.refreshListData();
        })
    }

    refreshListData() {
        this.resetLoading(true)
        Database.getInstance().getOrderList(this.state.page, this.props.pageSize,
            (err: null | string, data: { listData: OrderData[], total: number }) => {
                if (err) {
                    console.log(err);
                    this.refreshListData();
                    return;
                }
                //删除订单后页数不能超
                if (this.state.page + 1 > Math.ceil(data.total / this.props.pageSize)) {
                    this.setState({
                        ...this.state,
                        page: this.state.page - 1
                    })
                    this.refreshListData();
                    return;
                }
                //更新页面
                this.setState(this.state = {
                    ...this.state,
                    ...data,
                    isLoading:false
                })
            })
    }

    resetEditData(isEdit: boolean) {
        this.setState(this.state = {
            ...this.state,
            editData: {
                id: 0,
                date: '',
                salesName: '',
                amount: 0,
                detail: [
                    {
                        name: '',
                        amount: 0
                    }
                ]
            },
            isEdit: isEdit
        })
    }

    resetLoading(isLoading:boolean){
        setTimeout(() => {
            this.setState({
                ...this.state,
                isLoading:isLoading
            })
        }, 0);
    }

    onClickPageBtn(page: number) {
        this.state.page = page;
        this.refreshListData();
    }


}

for (let i = 0; i < 100; i++) {
    Database.getInstance().addOrder({
        id: i,
        date: '2020-08-01',
        salesName: 'xxx',
        amount:Math.round(Math.random() * 1000),
        detail: [
            {
                name: '袜子',
                amount: 5
            },
            {
                name: '鞋子',
                amount: 5
            },
            {
                name: '洗衣服',
                amount: 5
            },
        ]
    }, (err: null | string, msg: string) => { console.log(msg) })
}

render(
    <OrderManager pageSize={10} />,
    document.querySelector('body')
)
