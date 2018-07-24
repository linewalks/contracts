const Web3 = require("web3")
const fs = require("fs")

// Built PatientRegistrar Contract
const PatientRegistrarContract = fs.readFileSync(
  "./build/contracts/PatientRegistrar.json"
)
const PatientRegistrarContractABI = JSON.parse(PatientRegistrarContract).abi
class PatientSDK {
  connect({ networkConfig, patientRegistrarContractTx }) {
    /**
     * Connect to network
     * If patient contract is already created
     * store contrat reference while connecting
     */
    const { host, port, networkId } = networkConfig

    if (!host || !port || !networkId) {
      throw new Error("Insufficient parameters to connect to the network")
    }

    if (!patientRegistrarContractTx) {
      throw new Error("No Patient Registrar Address Provided")
    }
    this.patientRegistrarRef = patientRegistrarContractTx

    this.connection = new Web3(
      new Web3.providers.HttpProvider(`${host}/${port}`)
    )
    this.patientRegistrarRef = new this.connection.eth.Contract(
      PatientRegistrarContractABI
    )
  }

  createPatient({ payload }) {
    /**
     *
     */
  }

  /**
   * Get All Patients in network
   */
  getAllPatients() {
    this.patientRegistrarRef.methods
      .viewPatientsList()
      .call()
      .then(resp => {
        console.log(JSON.stringify(resp))
      })
  }

  getPatient() {
    /**
     * Get Patient given contract ref
     */
  }
}

module.exports = PatientSDK
