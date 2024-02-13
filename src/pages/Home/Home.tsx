import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { Button } from "antd";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.HomeContainer}>
            <div className={styles.Left}>
                <div>
                    <h1>Bonjour John !</h1>
                    <p>Bienvenue sur votre espace Enerfox. Vous pouvez suivre votre consommation énergétique quotidienne en vous rendant sur votre tableau de bord.</p>
                </div>
                <Button type="primary" size="large" onClick={() => navigate("/dashboard")}>
                    Accéder à mon tableau de bord
                </Button>
            </div>
            <div className={styles.Right}>
                <img src="/src/assets/enerfox_3d.webp" alt="Enerfox optimise vos performances énergétiques" />
            </div>
        </div>
    );
}