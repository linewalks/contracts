import styles from "antd/dist/antd.css"

export default ({ children }) => (
  <main>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    {children}
  </main>
)
