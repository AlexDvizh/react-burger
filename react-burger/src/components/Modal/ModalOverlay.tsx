import styles from "./modal.module.css";


function ModalOverlay({ onClose }: { onClose: () => void }): JSX.Element  {

    return (
        <div onClick={onClose} className={styles.overlay} id="modal-overlay">
        </div>
    )
}

export default ModalOverlay;