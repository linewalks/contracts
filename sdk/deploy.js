const SDK = require("./index.js")
const sdk = new SDK()

// Initialize PatientRegistrar Contract
// const PatientRegistrarContract = sdk.deployContract(
//   "./build/contracts/PatientRegistrar.json",
//   ethAddress
// )

module.exports = {
  patientRegistrar: ethAddress => {
    // Deploy patientRegistrar contracts
    return sdk.deployContract(
      "./build/contracts/PatientRegistrar.json",
      ethAddress
    )
  },
  provider: () => {
    // Deploy provider contracts
  },
  claim: () => {
    // Deploy claim contracts
  }
}
