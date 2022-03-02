const Auction = artifacts.require('Auction');
require('chai')
.use(require('chai-as-promised'))
.should()

contract('Auction',([owner,customer])=>{

    let auction

    before( async() => {
        auction = await Auction.new()
    });

    describe('Get Owner', async () => {
        it('Get auction Owner Succesfully', async () => {

            const bidder = auction.GetOwner()
            assert.equal(bidder,owner)
            
        });
        
    });

})