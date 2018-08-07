import React from "react"
import App from "../components/App"
import { DatePicker } from "antd"

class Dashboard extends React.Component {
  render() {
    return (
      <App>
        <div className="">
          <DatePicker />
        </div>
      </App>
    )
  }
}

export default Dashboard
