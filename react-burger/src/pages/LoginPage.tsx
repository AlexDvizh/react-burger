import LoginForm from "../components/LoginForm/LoginForm";
import styles from "./pages.module.css";


function LoginPage(): JSX.Element {

    return (
        <div className={styles.main}>
            <LoginForm />
        </div>
    )
}

export default LoginPage;