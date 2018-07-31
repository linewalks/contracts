const Web3 = require("web3")
const fs = require("fs")
const config = require("../config")

const { gas, gasPrice, adminAddress, httpProvider } = config

const CompiledProviderContract = fs.readFileSync(
  "./build/contracts/Provider.json"
)

const ProviderContractABI = JSON.parse(CompiledProviderContract).abi

class ProviderSDK {
  connect({ networkConfig, providerContractTx, connectAs }) {
    /**
     * Connect to network
     * If provider contract is already created
     * store contract reference while connecting
     */
    const { host, port, networkId } = networkConfig

    if (!host || !port || !networkId) {
      throw new Error("Insufficient parameters to connect to the network")
    }

    if (!providerContractTx) {
      throw new Error("No Provider Address Provided")
    }
    this.providerContractTx = providerContractTx
    this.connectAs = connectAs

    this.web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
    this.providerContractRef = new this.web3.eth.Contract(
      PatientRegistrarContractABI,
      providerContractTx,
      { from: connectAs }
    )
  }
}

module.exports = ProviderSDK
