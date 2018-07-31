const Web3 = require("web3")
const ProviderSDK = require("./provider")
const deploy = require("./deploy")
const config = require("../config")

const { adminAddress, httpProvider } = config

async function deployProviderContract(address, name) {
  const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
  let contractAddr
  try {
    contractAddr = await deploy.provider(address, name)
  } catch (e) {
    console.log(e)
  }
  return contractAddr
}

const providerSDK = new ProviderSDK()
console.log(adminAddress)
const contractAddr = deployProviderContract(adminAddress, "BCD").then(
  res => console.log(res),
  err => console.log(err)
)
