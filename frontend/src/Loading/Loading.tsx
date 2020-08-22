import React from "react";

export interface LoadingProps extends React.Props<any>{
    tagName:string
}


export class Loading extends React.Component<LoadingProps>{
    constructor(props:LoadingProps){
        super(props);
    }
    render(){
        return(
            React.createElement(this.props.tagName,{id:"Loading"},
            <div className='box'>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>)
        )
    }
}