export class SDK {
  constructor({ host, port, networkId }) {
    this.host = host
    this.port = port
    this.networkId = networkId
  }

  checkStatus = () => {
    console.log(this.host)
  }
}
