import React from "react"
import App from "../components/App"
import { Layout, Button, Col, Row } from "antd"
import Router from "next/router"

const { Header, Footer, Content } = Layout

class Dashboard extends React.Component {
  render() {
    return (
      <App>
        <Layout>
          <Header>Header</Header>
          <Content>
            <Row>
              <Col span={24}>
                <div
                  style={{
                    marginTop: "40px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "20vh"
                  }}
                >
                  <h1>Welcome to MCIDL</h1>
                  <h3 style={{ padding: "24px" }}>
                    Medical claim issuance and data lookup application using
                    blockchain technology
                  </h3>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Button
                    type="primary"
                    icon="poweroff"
                    onClick={() => Router.push("/connect")}
                  >
                    Connect to the network
                  </Button>
                </div>
              </Col>
            </Row>
          </Content>
          <Footer style={{ marginTop: "200px" }}>powered by linewalks</Footer>
        </Layout>
      </App>
    )
  }
}

export default Dashboard
