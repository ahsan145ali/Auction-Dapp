import React, { Component } from "react";
import Web3 from "web3";
import Auction from '../contracts/Auction.json'
import NavBar from "./NavBar.js";
import Main from "./Main";


class App extends Component {

  async UNSAFE_componentWillMount(){
    await this.LoadWeb3()
    await this.LoadBLockChain()
  }

  async LoadWeb3(){
    if(window.ethereum)
    { 
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if(window.web3)
    {
      window.web3 = new Web3( window.web3.currentProvider)
    }
    else{
      window.alert('No MetaMask or anyother connection Detected')
    }

  }
  async LoadBLockChain(){
    const web3 = window.web3
    const account = await web3.eth.getAccounts()
    this.setState({account:account[0]})
    console.log(account)

    //Ganache Network ID
    const networkID = await web3.eth.net.getId()

    //Load Contract
    const ContractData = Auction.networks[networkID]
    if(ContractData){
      const cont = new web3.eth.Contract(Auction.abi,ContractData.address)
      this.setState({auction:cont})  

      const owner_addr = await cont.methods.GetOwner().call()
      this.setState({auction_owner:owner_addr})
      console.log("Onwer Address: ", this.state.auction_owner)
      
    }
    this.setState({loading:false})


  }
  
  PlaceBid = async (amount) =>{
    let status = await this.state.auction.methods.StartAuction().call()
    if(status)
    {
    this.setState({loading:true})
    let curr = await this.CurrentBid();
    curr[1] = window.web3.utils.toWei(curr[1],'Ether')
    console.log("Current: " , curr[1] , "Placed: ",amount)
      if(amount > curr[1]){
        
      
      await this.state.auction.methods.BidNow(amount).send({from:this.state.account}).on('transactionHash',(hash)=>{
        this.setState({loading:false})
        
      })
    }
    else{
      window.alert("Invalid Amount")
      this.setState({loading:false})
    }
  }
  else{
    window.alert("Auction not started yet")
  }
    
  }
  GetStatus = async()=>{
    let status = await this.state.auction.methods.StartAuction().call()
    if(status== true){this.StartTimer()}
  }

  PreviousBid = async() =>{

       let prev = await this.state.auction.methods.GetPrevBid().call()
       let aa = window.web3.utils.fromWei(prev[1],'ether')
       prev[1] = aa
       return prev;
  }

  CurrentBid = async() =>{

   let curr = await this.state.auction.methods.GetHighestBid().call()
   let aa = window.web3.utils.fromWei(curr[1],'ether')
   curr[1] = aa
   return curr;

}
  StartAuction = async(addr) =>{
    if(addr != this.state.auction_owner){
      window.alert('Auction Can Only be started by the Owner')
      
    }
    else{
      await this.state.auction.methods.StartAuction().call()
      this.StartTimer()
    }

  }
  StartTimer(){
    if(this.state.timer> 25)
    {
    this.timer_id = setInterval(this.CountDown,1000)
    }
  }
  CountDown = async()=>{

    if(this.state.timer <= 25 ){
      window.alert('Auction Ended')
      this.setState({timer:30},()=>{localStorage.setItem('timer',30)})
      clearInterval(this.timer_id)
      this.timer_id = 0
      }
    else{

      let timeLeft = this.state.timer - 1
      this.setState({timer:timeLeft},()=>{localStorage.setItem('timer',timeLeft)})
      console.log("Timer: " , this.state.timer)
    }

    }
  constructor(props){
    super(props)
      this.state={
        auction_owner:'0x0',
        account:'0x00001',
        auction:{},
        loading:true,
        timer: JSON.parse(localStorage.getItem('timer')) || 30
      }
      this.timer_id = 0
    
  }
  
  render(){
    let content
    {this.state.loading? content = <p id='loader' className='text-center' style={{marginTop:'100px',color:'red'}}><strong>Loading Contracts...</strong></p>
    :
    content = <Main
    PlaceBid = {this.PlaceBid}
    PreviousBid = {this.PreviousBid}
    CurrentBid = {this.CurrentBid}
    />
    }
  
    return(
      <div>
        
      <div>
      {this.StartTimer}
      <NavBar account = {this.state.account} owner ={this.state.auction_owner} StartAuction = {this.StartAuction} timer ={this.state.timer}/>
      </div>
    
      {content}
      <div>
     
      </div>
      
      </div>
    )
  }
}
export default App;
