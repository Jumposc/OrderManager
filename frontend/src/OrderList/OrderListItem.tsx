import React from 'react';
import { OrderData } from "../interface/interface";

export interface OrderListItemProps extends React.Props<any> {
    data: OrderData
    onClickItemDelete: Function
    onClickItemModify: Function
}

export class OrderListItem extends React.Component<OrderListItemProps>{
    render() {
        return (
            <div className="tr">
                <div className="th">{this.props.data.date}</div>
                <div className="th">{this.props.data.salesName}</div>
                <div className="th">{this.props.data.amount}</div>
                <div className="th">
                    {this.props.data.detail.map((v, i) => <div key={i}>{v.name}x{v.amount}</div>)}
                </div>
                <div className="th">
                    <a className="modify" onClick={() => { this.props.onClickItemModify(this.props.data.id) }}>修改</a>
                    <a className="delte" onClick={() => { this.props.onClickItemDelete(this.props.data.id) }}>删除</a>
                </div>
            </div>
        )
    }
}