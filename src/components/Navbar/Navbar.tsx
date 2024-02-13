import styles from "./Navbar.module.css";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation } from "react-router-dom";

const items: MenuProps["items"] = [
    {
        label: <Link to="/">Accueil</Link>,
        key: "/",
    },
    {
        label: <Link to="/dashboard">Tableau de bord</Link>,
        key: "/dashboard",
    }
];

export default function Navbar() {
    const location = useLocation();

    return (
        <Layout.Header className={styles.Header}>
            <Link to="/" className={styles.EnerfoxLogoContainer}>
                <img src="/src/assets/enerfox_logo.svg" alt="" title="Accueil Enerfox" width={155} />
            </Link>
            <Menu
                theme="light"
                mode="horizontal"
                defaultSelectedKeys={[location.pathname]}
                items={items}
                className={styles.Menu}
            />
        </Layout.Header>
    );
}