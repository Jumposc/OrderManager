import React, { Props } from 'react';
import { OrderData } from '../interface/interface';


export interface EditPopupProps extends React.Props<any> {
    data: OrderData
    isShow: boolean
    onClickEditSave: Function
    onClickEditClose: Function
}

export interface EditPopupState {
    data: OrderData
}

export class EditPopup extends React.Component<EditPopupProps, EditPopupState>{

    constructor(props: EditPopupProps) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(nextProps: EditPopupProps) {
        this.setState({
            data: nextProps.data
        })
    }

    render() {
        return (
            <div className={this.props.isShow ? 'EditPopup open' : 'EditPopup hide'}>
                <div className="top">
                    <div className="title">增加/修改订单</div>
                    <div>
                        <button className="save" onClick={() => { this.props.onClickEditSave(this.state.data); }}>保存</button>
                        <button className="close" onClick={() => { this.props.onClickEditClose(); }} >关闭</button>
                    </div>
                </div>
                <div className="edit-area">
                    <div className={this.state.data.id === 0 ? 'hide':''}>ID {this.props.data.id}</div>
                    <div className="date">
                        日期
                <input type="text" value={this.state.data.date} onChange={(e) => this.onChange('date', e.currentTarget.value)} />
                    </div>
                    <div className="salesName">
                        销售
                <input type="text" value={this.state.data.salesName} onChange={(e) => this.onChange('salesName', e.currentTarget.value)} />
                    </div>
                    <div className="amount">
                        金额
                <input type="text" value={this.state.data.amount} onChange={(e) => this.onChangeAmount(parseInt(e.currentTarget.value))} />
                    </div>
                    <div className="table">
                        <div className="row">
                            <div className="detail">明细</div>
                            <div className="name">品名</div>
                            <div className="amount">数量</div>
                        </div>
                        <ul>
                            {this.state.data.detail.map((v, i) =>
                                <li key={i}>
                                    <input type="text" className="name" value={v.name} onChange={(e) => { this.onChangeDetail('name', e.currentTarget.value, i) }} />
                                    <input type="text" className="amount" value={v.amount} onChange={(e) => { this.onChangeDetailAmount(parseInt(e.currentTarget.value), i) }} />
                                    <button className="delete" onClick={()=>this.onClickDelete(i)}>删除</button>
                                </li>)}
                        </ul>
                        <button className="add" onClick={()=>this.onClickAddDetail()}>添加</button>
                    </div>
                </div>
            </div>
        )
    }

    onChangeAmount(value: number) {
        if (value) {
            this.state.data.amount = value;
            this.setState(this.state);
        }
    }
    onChange(key: string, value: string) {
        this.state.data[key] = value;
        this.setState(this.state);
    }

    onChangeDetail(key: string, value: string, index: number) {
        this.state.data.detail[index][key] = value;
        this.setState(this.state);
    }

    onChangeDetailAmount(value: number, index: number) {
        this.state.data.detail[index].amount = value;
        this.setState(this.state);
    }

    onClickAddDetail() {
        this.state.data.detail.push({
            name: '',
            amount: 0
        })
        this.setState(this.state);
    }
    onClickDelete(index:number){
        if(this.state.data.detail.length === 1){
            this.state.data.detail[0] = {
                name:'',
                amount:0
            }
            this.setState(this.state);
            return;
        }
        this.state.data.detail.splice(index,1);
        this.setState(this.state);
    }
}