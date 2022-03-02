import React, { Component } from "react";
import Bid_item1 from "./Bid_item1";
import './Main.css';


class Main extends Component{
    
    updateBid = async()=>{
                let curr= await this.props.CurrentBid()
                let prev = await this.props.PreviousBid()

                this.setState({curr_addr:curr[0]})
                this.setState({curr_amount:curr[1]})

                this.setState({prev_addr:prev[0]})
                this.setState({prev_amount:prev[1]})
    }

    constructor(props){
        super(props)
          this.state={
           prev_addr:'0x0000000000000',
            curr_addr:'0x0000000000000',
            prev_amount:'0',
            curr_amount:'0'
          }
        
      }

    render(){
        return(
            <div>
            <Bid_item1 />
            
            <form className="text-center mb-3"
                onSubmit={(event)=>{ event.preventDefault()
                    let amount = this.input.value.toString()
                    amount = window.web3.utils.toWei(amount,'Ether')
                    this.props.PlaceBid(amount)  
                    this.updateBid()              
                }}
                     >
                <input type='number' placeholder="0" required
                    ref = {(input) =>{this.input = input}}>
                
                </input>
                <button type='submit' className="btn btn-primary" style={{marginLeft:'5px'}}>
                    Place Bid
                </button>

            </form>
            <div>
            <form className="text-center mb-3"
            onSubmit={(event)=> { event.preventDefault()
                this.updateBid()
            }}
            
            >
                
                <table>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Current:</strong></td>
                            <td>{this.state.curr_addr}</td>
                            <td>{this.state.curr_amount} Eth</td>

                        </tr>
                        <tr>
                            <td><strong>Previous:</strong></td>
                            <td>{this.state.prev_addr}</td>
                            <td>{this.state.prev_amount} Eth</td>
                        </tr>
                    </tbody>
                </table>
                <button type='submit' className="btn btn-primary" style={{marginLeft:'5px'}}>
                    Get Bids
                </button>

            </form>
            </div>

            </div>

        )
    }
}

export default Main;