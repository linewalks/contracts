const SDK = require("./index.js")
const sdk = new SDK()

// Initialize PatientRegistrar Contract
const PatientRegistrarContract = sdk.deployContract(
  "./build/contracts/PatientRegistrar.json",
  ethAddress
)

modules.export = {
  patientRegistrar: () => {
    // Deploy patientRegistrar contracts
  },
  provider: () => {
    // Deploy provider contracts
  },
  claim: () => {
    // Deploy claim contracts
  }
}
