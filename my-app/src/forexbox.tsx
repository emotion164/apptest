import * as React from 'react';
import { Button, Dropdown,Statistic} from 'semantic-ui-react'
import {Client} from './client'

interface IDataBoxProps {
    index: number
    from: string,
    to: string,
    symbolList: Array<{key:string, value:string, text:string}>,
    removeBox(idx: number):any
}

export class ForexBox extends React.Component<IDataBoxProps, any>{
    
    public dataClient:Client 
    
    public state :any = {
        from: "",
        to: "",
        value: 0,
        refreshed: false
    } 

    constructor(props:any) {
        super(props)
        this.dataClient = new Client("alphavantage")
        this.state.from = this.props.from
        this.state.to = this.props.to
        this.refreshData = this.refreshData.bind(this)
    }

    public refreshData() {
        this.dataClient.getData(this.state.from, this.state.to)
          .then((newValue:any)=>this.setState({value:newValue}))
    }

    public componentDidMount() {
        this.refreshData()
    }

    
    public render() {
        const click =()=>{
            this.props.removeBox(this.props.index)
        }
       
        const onSymFromChange =(event:any, data:any)=>{
            this.state.from = data.value
            this.dataClient.getData(this.state.from, this.state.to)
               .then((price:any)=>this.setState({value: price}))
        }

        const onSymToChange =(event:any, data:any)=>{
            this.state.to = data.value
            this.dataClient.getData(this.state.from, this.state.to)
               .then((price:any)=>this.setState({value: price}))
        }

       return  <div className="test">
        <Button onClick={click} color='red'>delete</Button>
        <Button onClick={this.refreshData}>refresh</Button>  
        <Dropdown placeholder={this.state.from}
                  onChange={onSymFromChange}
                  fluid search selection options={this.props.symbolList} />
        <Dropdown placeholder={this.state.to}
                  onChange={onSymToChange}
                  fluid search selection options={this.props.symbolList} />
        <Statistic size='mini'>
          <Statistic.Label>{this.state.from}/{this.state.to}</Statistic.Label>
          <Statistic.Value>{this.state.value}</Statistic.Value>
        </Statistic> 
        </div>
    }

}
