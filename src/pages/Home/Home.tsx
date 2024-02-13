import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function Home() {

    return (
        <div className={styles.HomeContainer}>
            <div className={styles.Left}>
                <div>
                    <h1>Bonjour John !</h1>
                    <p>Bienvenue sur votre espace Enerfox. Vous pouvez suivre votre consommation énergétique quotidienne en vous rendant sur votre tableau de bord.</p>
                </div>
                <Link to="/dashboard">
                    <Button type="primary" size="large">
                        Accéder à mon tableau de bord
                    </Button>
                </Link>
            </div>
            <div className={styles.Right}>
                <img src="/enerfox_3d.webp" alt="Enerfox optimise vos performances énergétiques" />
            </div>
        </div>
    );
}