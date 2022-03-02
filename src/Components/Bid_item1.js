import React,{Component} from "react";
import eth from './eth.png'

class Bid_item1 extends Component{

    render(){
        return(
            <div className="text-center" style={{marginTop:'170px'}}>

                <img src = {eth} alt='Ethereum' heigh='32'/>
            </div>
        )
    }
}

export default Bid_item1;