import React from "react";
import { OrderListItem } from './OrderListItem'
import { OrderData } from "../interface/interface";
import { Loading } from "../Loading/Loading";

export interface OrderListProps extends React.Props<any> {
    isLoading: boolean
    listData: OrderData[]
    onClickListItemDelete: Function
    onClickListItemModify: Function
}

export class OrderList extends React.Component<OrderListProps>{

    render() {
        return (
            <div className="table">
                <div className="thead">
                    <div className="tr">
                        <div className="th">日期</div>
                        <div className="th">销售</div>
                        <div className="th">金额</div>
                        <div className="th">明细</div>
                        <div className="th">操作</div>
                    </div>
                </div>
                <div className="tbody">
                    {this.props.isLoading ? <Loading tagName='div'/>:this.props.listData.map((v,i)=> <OrderListItem key={i} data={v} onClickItemDelete={this.props.onClickListItemDelete}
                    onClickItemModify={this.props.onClickListItemModify} />)}
                </div>
            </div>
        )
    }
}