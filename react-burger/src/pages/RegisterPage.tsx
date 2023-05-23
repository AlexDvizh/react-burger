import { useEffect } from "react";
import { useSelector } from "react-redux";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import styles from "./pages.module.css";
import { useNavigate } from "react-router-dom";
import { RootState } from "../services/reducers";

function RegisterPage(): JSX.Element {
  
  const { isLoggedIn } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  });
  
  return (
    <div className={styles.main}>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
