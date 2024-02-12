import styles from "./Navbar.module.css";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
    {
        label: <Link to="/">Accueil</Link>,
        key: "home",
    },
    {
        label: <Link to="/dashboard">Tableau de bord</Link>,
        key: "dashboard",
    }
];

export default function Navbar() {
    return (
        <Layout.Header className={styles.Header}>
            <Link to="/" className={styles.EnerfoxLogoContainer}>
                <img src="/src/assets/enerfox_logo.svg" alt="" title="Accueil Enerfox" width={155} />
            </Link>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={["home"]}
                items={items}
                className={styles.Menu}
            />
        </Layout.Header>
    );
}