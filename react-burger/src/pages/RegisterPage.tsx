import { useEffect } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./pages.module.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../services/slices";
import { useAppSelector } from "../services/hooks";

function RegisterPage(): JSX.Element {
  const { isLoggedIn } = useAppSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  
  return (
    <div className={styles.main}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;

