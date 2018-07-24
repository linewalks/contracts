const SDK = require("./index.js")
const sdk = new SDK()

const ethAddress = "0xe77541c7fe95e525120e5dad3bdb430a803b5ef4"
const gas = 1500000
const gasPrice = "20000000000"

const PatientRegistrarContract = sdk.deployContract(
  "./build/contracts/PatientRegistrar.json",
  ethAddress
)

PatientRegistrarContract.then(contract => {
  return contract.methods
    .viewPatientsList()
    .call()
    .then(receipt => {
      console.log("First Call Tx \n" + receipt)
      return Promise.resolve(contract)
    })
    .then(contract => {
      return contract.methods
        .registerPatientToRegistrar(ethAddress, "Male", 1986)
        .send({
          from: ethAddress,
          gas,
          gasPrice
        })
        .then(
          receipt => {
            console.log("Second Call Tx \n" + JSON.stringify(receipt))
            return Promise.resolve(contract)
          },
          err => console.log(err)
        )
    })
    .then(contract => {
      return contract.methods
        .viewPatientsList()
        .call()
        .then(receipt => {
          console.log("Third Call Tx \n" + JSON.stringify(receipt))
          return Promise.resolve(contract)
        })
    })
})
