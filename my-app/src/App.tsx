import * as React from 'react';
import {Button} from 'semantic-ui-react'
import './App.css';
import {ForexBox} from './forexbox';
import logo from './logo.svg';



class App extends React.Component<any, any> {

  public defaultSymbols = [{from: "BTC", to: "USD"},{from: "CNH", to: "USD"}]

  public forexSymbols =[] as Array<{key:string, value:string, text:string}>

  public state = {
    key: 0,
    boxes: [] as Array<{key:number, symbol_from:string, symbol_to:string}>
  }

  public loadDefaultBox() {
      this.defaultSymbols.forEach(sym=>{
          this.state.boxes.push({key:this.state.key, symbol_from:sym.from, symbol_to:sym.to})
          this.state.key = this.state.key + 1
      })
  }

  public loadForexSymbols() {
      const symbolFiles = ["/forexSymbols.json", "/digitalSymbols.json"]
      symbolFiles.forEach((fileName:string)=>{
          fetch(fileName).then(x=>x.json()).then(symbol=>{
              symbol.forEach((element:any) => {
                  this.forexSymbols.push({key: element["currency code"],
                                           value: element["currency code"], 
                                           text:element["currency name"] })
              })
          })
      })
  }

  constructor(props:any) {
      super(props)
      this.removeBox = this.removeBox.bind(this)
      this.loadForexSymbols()
      this.loadDefaultBox()
  }

  public removeBox(idx:number) {
    const newBoxes = this.state.boxes.filter((item) => {
         return item.key !== idx
    })
    this.setState({boxes:newBoxes})
   }

  public render() {
   
    const onClick =() =>{
      const newkey = this.state.key + 1
      const newBoxes = this.state.boxes.slice()
      newBoxes.push({key:newkey, symbol_from:"USD", symbol_to: "CNH"})
      this.setState({key: newkey, boxes: newBoxes})
    }

   
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button positive={true} onClick={onClick}>click me</Button>
        <div className="Dashborad">
        {
            this.state.boxes.map((item)=>{
              return <ForexBox index={item.key} 
                    from={item.symbol_from} 
                    to={item.symbol_to}
                    symbolList={this.forexSymbols}
                    removeBox={this.removeBox} key={item.key}/>
            })
        }
        
      
        </div>
      </div>
       
    );
  }
}

export default App;
