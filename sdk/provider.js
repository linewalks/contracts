const Web3 = require("web3")
const fs = require("fs")
const config = require("../config")
const deploy = require("./deploy")
const { gas, gasPrice, adminAddress, httpProvider } = config

const CompiledProviderContract = fs.readFileSync(
  "./build/contracts/Provider.json"
)

const ProviderContractABI = JSON.parse(CompiledProviderContract).abi

class ProviderSDK {
  connect({ networkConfig }) {
    // Connect to network
    const { host, port, networkId } = networkConfig

    if (!host || !port || !networkId) {
      throw new Error("Insufficient parameters to connect to the network")
    }
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(httpProvider))
  }

  // When Provider is already created and exists in the network
  connectAsProvider({ networkConfig, contractHash, providerAccountAddr }) {
    const { host, port, networkId } = networkConfig

    if (!host || !port || !networkId) {
      throw new Error("Insufficient parameters to connect to the network")
    }
    this.web3 = new Web3(new Web3.providers.WebsocketProvider(httpProvider))

    this.providerContractRef = new this.web3.eth.Contract(
      ProviderContractABI,
      contractHash,
      { from: providerAccountAddr }
    )
  }

  // Creates an instance of the Provider Contract
  async createProviderIdentity({
    name,
    typeOfHospital,
    clinicalSpecialty,
    address
  }) {
    if (!this.web3) {
      console.error(
        "Not connected to any network; call the connect method first!"
      )
    }
    let contractHash
    try {
      contractHash = await deploy.provider(
        address,
        name,
        typeOfHospital,
        clinicalSpecialty
      )
    } catch (e) {
      console.log(e)
    }

    this.providerContractRef = new this.web3.eth.Contract(
      ProviderContractABI,
      contractHash,
      { from: address }
    )

    return contractHash
  }

  subscribeToAllEvents() {
    this.providerContractRef.events.allEvents(
      { fromBlock: 0 },
      (err, result) => {
        console.log(result)
      }
    )
  }

  getAllIssuedClaims() {
    console.log(
      `Fetching all claims issued by provider ${
        this.providerContractRef.options.address
      }`
    )
    return this.providerContractRef.methods
      .viewIssuedClaims()
      .call()
      .then(
        resp => {
          const claims = resp.map(claim => {
            const [
              type,
              cost,
              description,
              patientAddr,
              createdAt,
              isValidated
            ] = claim
            return {
              type,
              cost,
              description,
              patientAddr,
              createdAt,
              isValidated
            }
          })
          return Promise.resolve(claims)
        },
        err => console.log(err)
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
