export interface OrderData{
    [strIndex:string]:number|string|Array<object>
    [numberIndex:number]:number
    id: number
    date:string,
    salesName: string,
    amount: number,
    detail: Array<
        {
            [strIndex:string]:string|number
            [numberIndex:number]:number
            name: string,
            amount: number
        }
    >
}