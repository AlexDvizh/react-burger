import PropTypes from "prop-types";
import styles from "./modal.module.css";


const ModalOverlay = (props) => {

    return (
        <div onClick={props.onClose} className={styles.overlay}>
        </div>
    )
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;