const Web3 = require("web3")
const ProviderSDK = require("./provider")
const deploy = require("./deploy")
const config = require("../config")

const { adminAddress, httpProvider } = config

const testAddr = adminAddress

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

async function testScript() {
  const providerSDK = new ProviderSDK()

  const contractAddr = await deployProviderContract(
    adminAddress,
    "CDE Hospital"
  )

  console.log(`Provider Contract deployed: ${contractAddr}`)

  providerSDK.connect({
    networkConfig: {
      host: "http://localhost",
      port: 8545,
      networkId: "*"
    },
    connectAs: adminAddress,
    providerContractTx: contractAddr
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 5430,
    description: "A0010101"
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 12430,
    description: "B0021141"
  })

  await providerSDK.issueClaimForPatient(testAddr, {
    type: "component",
    cost: 42430,
    description: "C0021141"
  })

  const claims = await providerSDK.getAllIssuedClaims()
  console.log(claims)
}

testScript()
