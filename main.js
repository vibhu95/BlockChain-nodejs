
/*
    @Author  #Vibhuti (http://vibhuti.netlify.app/)
*/

const SHA256 = require('crypto-js/sha256');
const Base64 = require('crypto-js/enc-base64');

const privateKey = ";34hl3g6l34ghl5g324k3ug3h4j'5434;iotuhe;.weu5p340";

class Block{
    constructor(index, timestamp, data, previoushash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previoushash = previoushash;
        this.hash = this.calculateHash();
    }

    calculateHash(){
        return Base64.stringify(SHA256(this.index + this.timestamp + JSON.stringify(this.data), privateKey));
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0,'10/05/2019','Initial Block','0');
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(addBlock){
        addBlock.previoushash = this.getLastBlock().hash;
        addBlock.index = this.chain.length;
        addBlock.hash = addBlock.calculateHash();
        this.chain.push(addBlock);
    }

    validateChain(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previoushash !== prevBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let myBlockChain = new BlockChain();
myBlockChain.addBlock(new Block('15/06/2019',{ paid : 400 }));
myBlockChain.addBlock(new Block('16/06/2019',{ paid : 500 }));
myBlockChain.addBlock(new Block('18/06/2019',{ paid : 700 }));

console.log(JSON.stringify(myBlockChain));
console.log(myBlockChain.validateChain());
myBlockChain.chain[1].data = { paid : 1200 };
console.log(myBlockChain.validateChain());