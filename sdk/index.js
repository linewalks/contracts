const Web3 = require("web3")
const fs = require("fs")

class SDK {
  constructor(config = {}) {
    const { host = "localhost", port = 8545, networkId = "*" } = config

    this.host = host
    this.port = port
    this.networkId = networkId
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    )
  }

  checkStatus() {
    console.log(this.host)
  }

  createContract(pathToContract) {
    try {
      const contractJsonInterface = fs.readFileSync(pathToContract)
      return new this.web3.eth.Contract(JSON.parse(contractJsonInterface).abi)
    } catch (e) {
      console.error("Error while creating contract: " + e)
    }
  }

  deployContract(
    pathToContract,
    fromAddress,
    gas = 1500000,
    gasPrice = "20000000000"
  ) {
    try {
      const contractJsonInterface = fs.readFileSync(pathToContract)
      const { abi, bytecode } = JSON.parse(contractJsonInterface)
      const ContractToDeploy = new this.web3.eth.Contract(abi)
      return ContractToDeploy.deploy({
        data: bytecode
      }).send(
        {
          from: "0x318c9588ba25c3aa9342182fa7c84a7ed20f34e4",
          gas: 1500000,
          gasPrice: "20000000000"
        },
        function(err, transactionHash) {
          console.log(transactionHash)
        }
      )
    } catch (e) {
      console.error("Error while creating contract: " + e)
    }
  }

  getAccounts() {
    return this.web3.eth.getAccounts(function(err, res) {
      if (err) {
        return Promise.reject("Failed to get Accounts")
      }
      return Promise.resolve(res)
    })
  }

  connect() {
    if (!this.web3.currentProvider) {
      this.web3 = new Web3(
        new Web3.providers.HttpProvider("http://localhost:8545")
      )
      return
    }
    console.info("Already connected to network")
  }
}

module.exports = SDK
