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
      ProviderContractABI,
      providerContractTx,
      { from: connectAs }
    )
  }

  issueClaimForPatient(patientAddr, { type, cost, description }) {
    console.log(`Issuing Claim for Patient Addr: ${patientAddr}`)
    return this.providerContractRef.methods
      .renderClaimForPatient(patientAddr, [type, cost, description])
      .send({
        from: this.connectAs,
        gas,
        gasPrice
      })
      .then(
        resp => {
          console.log(
            `Successfully issued claim for Patient with tx hash ${
              resp.transactionHash
            }`
          )
        },
        e => console.log(e)
      )
  }
}

module.exports = ProviderSDK
