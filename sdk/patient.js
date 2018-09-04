const Web3 = require("web3")
const fs = require("fs")
const config = require("../config")

const { gas, gasPrice, adminAddress, httpProvider } = config

// Built PatientRegistrar Contract
const PatientRegistrarContract = fs.readFileSync(
  "./build/contracts/PatientRegistrar.json"
)
const PatientRegistrarContractABI = JSON.parse(PatientRegistrarContract).abi

class PatientSDK {
  connect({ networkConfig, patientRegistrarContractTx, connectAs }) {
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
    this.patientRegistrarContractTx = patientRegistrarContractTx
    this.connectAs = connectAs

    this.web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
    this.patientRegistrarRef = new this.web3.eth.Contract(
      PatientRegistrarContractABI,
      patientRegistrarContractTx,
      { from: connectAs }
    )
  }

  createPatient({ address, patientCode, yearOfBirth, gender }) {
    /**
     * Create Patient and adds it to PatientRegistrar
     */
    console.log(
      `Adding patient with patientCode: ${patientCode}, yob: ${yearOfBirth}, gender: ${gender}`
    )

    return this.patientRegistrarRef.methods
      .registerPatientToRegistrar(address, patientCode, gender, yearOfBirth)
      .send({
        from: this.connectAs, // PatientRegistrar가 추가,
        gas,
        gasPrice
      })
      .then(
        resp => {
          console.log(
            `Successfully added Patient with tx hash ${resp.transactionHash}`
          )
        },
        e => console.log(e)
      )
  }

  /**
   * Get All Patients in network
   */
  getAllPatients() {
    return this.patientRegistrarRef.methods
      .viewPatientsList()
      .call()
      .then(
        resp => {
          console.log(JSON.stringify(resp))
        },
        e => console.log(e)
      )
  }

  getPatient() {
    /**
     * Get Patient given contract ref
     */
  }
}

module.exports = PatientSDK
