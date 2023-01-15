import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./modal.module.css";

const ModalOverlay = (props) => {

    return (
        <div onClick={props.onClose} className={styles.overlay}>
            {props.children}
        </div>
    )
}

export default ModalOverlay;