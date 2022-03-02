import React,{Component} from "react";

class NavBar extends Component{
    render(){
        return(
            <div>

            
            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor:'black',height:'50px'}}>
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" style={{color:'white'}}>
                    Auction Dapp
                </a>

                <ul className="navbar-nav px-3">
                <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                    <small style={{color: 'white'}}>Current User ACCOUNT NUMBER : {this.props.account} </small>
                </li>
            </ul>

            </nav>

            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor:'grey',height:'50px',marginTop:'50px'}}>
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" style={{color:'white'}}>
                    Auction Owner
                </a>

                <ul className="navbar-nav px-3">
                <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                    <strong style={{color: 'white'}}>ACCOUNT NUMBER : {this.props.owner} </strong>
                </li>
            </ul>

            </nav>

            <nav className="navbar navbar-dark fixed-top shadow p-0" style={{backgroundColor:'black',height:'50px',marginTop:'100px'}}>
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" style={{color:'white'}}>
                    <form 
                    onSubmit={(event)=>{event.preventDefault()
                    this.props.StartAuction(this.props.account)
                    
                    }}
                    
                    >
                        <button type="submit" className="btn btn-primary">START</button>
                    </form>
                </a>

                <ul className="navbar-nav px-3">
                <li className="text-nowrap d-none nav-item d-sm-none d-sm-block">
                    <strong style={{color: 'white'}}>Timer : {this.props.timer} </strong>
                </li>
            </ul>

            </nav>
          
            </div>

            
        )
    }
}

export default NavBar;