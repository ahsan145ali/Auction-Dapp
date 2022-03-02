// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

contract Auction {
 
  address payable Owner;
  address c_Highest_bidder;
  address prev_highest_bidder;
  uint c_highest_bid;
  uint prev_highest_bid;
  bool status;
  uint timer;

  mapping(address=>uint) bidders;

  
  constructor() public{
    timer = 30;
    status = false;
    Owner =  payable(msg.sender);
    c_highest_bid = 0;
    
  }
  event NewBid(
    address Bidder,
    uint Bid
  );
  
  function BidNow(uint amount) public payable {
      if(amount > c_highest_bid){
        
        //update bidders 
        bidders[c_Highest_bidder] = c_highest_bid;
        // set current highest bid to prev highest bid
        prev_highest_bid = c_highest_bid;
        prev_highest_bidder = c_Highest_bidder;

        //update current highest bidder
        c_highest_bid = amount;
        c_Highest_bidder = msg.sender;

        
        //Emit new Bid received
        emit NewBid(c_Highest_bidder,c_highest_bid); 

      }else{
        revert('Bid not high Enough');
      }
  }
  
  function GetOwner() public view returns(address){
    return Owner;
  }

  function GetHighestBid() public view returns(address bidder,uint amount){
    return (c_Highest_bidder , c_highest_bid);
  }
  function GetPrevBid() public view returns(address,uint){
    return (prev_highest_bidder,prev_highest_bid);
  }
  function StartAuction() public{

      status = true;
  }
  function GetStatus() public view returns(bool){
    return status;
  }
  function SetTimer(uint val) public{
    timer = val;
    
  }
  function GetTimer() public view returns(uint){
    return timer;
  }
}
