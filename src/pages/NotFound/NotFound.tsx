import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";
import { Button } from "antd";

export default function NotFound() {
    return (
        <div className={styles.NotFoundContainer}>
            <h1>404 - Page inconnue</h1>
            <Link to="/">
                <Button type="primary" size="large">Retour à l'accueil</Button>
            </Link>

        </div>
    );
}