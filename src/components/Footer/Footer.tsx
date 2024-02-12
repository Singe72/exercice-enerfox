import styles from "./Footer.module.css";
import { Layout } from "antd";

export default function Footer() {
    return (
        <Layout.Footer className={styles.Footer}>
            © Enerfox {new Date().getFullYear()}
        </Layout.Footer>
    )
}