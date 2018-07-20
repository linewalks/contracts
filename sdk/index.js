const Web3 = require("web3")

class SDK {
  constructor(config = {}) {
    const { host = "localhost", port = 8545, networkId = "*" } = config

    this.host = host
    this.port = port
    this.networkId = networkId
  }

  checkStatus() {
    console.log(this.host)
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
