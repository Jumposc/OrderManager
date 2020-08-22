import React from 'react';

export interface PagerProps extends React.Props<any> {
    page: number,
    total: number,
    pageSize: number,
    onClickPageBtn: Function,
}


export class Pager extends React.Component<PagerProps>{
    render() {
        let totalPage = Math.ceil(this.props.total / this.props.pageSize);
        return (
            <div className='Pager'>
                <a className={this.props.page === 0 ? 'last-page hide' : 'last-page'} 
                onClick={()=>this.props.onClickPageBtn(this.props.page - 1)}>上一页</a>
                <span>{this.props.page + 1}/{totalPage}</span>
                <a className={this.props.page + 1 === totalPage ? 'next-page hide' : 'next-page'}  
                onClick={()=>this.props.onClickPageBtn(this.props.page + 1)}> 下一页</a >
            </div >
        )
    }
}
