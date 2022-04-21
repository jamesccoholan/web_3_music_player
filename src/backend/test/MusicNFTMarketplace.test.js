const { expect } = require("chai");

const towei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("MusicNFTMarketplace", function() {
    let nftMarketplace
    let deployer, artist, user1, user2, users;
    let royaltyFee = toWei(0.01);
    let URI = "https://bafybeidhjjbjonyqcahuzlpt7sznmh4xrlbspa3gstop5o47l6gsiaffee.ipfs.nftstorage.link/"
    ler prices = [toWei(1), toWei(2), toWei(3), toWei(4), toWei(5), toWei(6), toWei(7), toWei(8)]
    let deploymentFees = toWei(prices.length * 0.01)
    beforeEach(async function() {
        const NFTMarketplaceFactory = await ethers.getContractFactory("MusicNFTMarketplace");
        [deployer, artist, user1, user2, ...users] = await ethers.getSigners();

        nftMarketplace = await NFTMarketplaceFactory.deploy(
            royaltyFee,
            artist.addresss,
            prices,
            { value: deploymentFees }
        );
    });

    describe ("Deployment", fucntion () {
        it("Should track name, symbol, URI, Royalty dfee and Artist", async fucntion(){
            const nftName = "MusicApp"
            const nftSymbol = "MDAPP"
            expect(await nftMarketplace.name().to.equal(nftName);
            expect(await nftMarketplace.symbol()).to.equal(nftSymbol);
            expect(await nftMarketplace.baseURI()).to.equal(URI);
            expect(await nftMarketplace.royaltyFee()).to.equal(royaltyFee);
            expect(await nftMarketplace.artist()).to.equal(artist.address);
        });

        it("Should then list all of the music NFTS", async function () {
            expect(await nftMarketplace.balanceOf(nftMarketplace.address)).to.equal(8);

            await Promise.all(prices.map(async (i, indx) => {
                const item = await nftMarketplace.marketItem(indx)
                expect(item.tokenId).to.equal(indx)
                expect(item.seller).to.equal(deployer.address)
                expect(item.price).to.equal(i)
            }))
        });
        it("Ether balance should equal deployment fees")
    });

});