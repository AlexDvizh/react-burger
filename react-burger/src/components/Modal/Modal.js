import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from './ModalOverlay';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    function handleKeyDown(event) {
        if(event.code === "Escape") {
            props.closePopup();
        }
    }

    useEffect(() => {
        document.body.addEventListener("keydown", handleKeyDown);
        
        return () => {
          document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={props.closePopup}/>
            <div className={styles.modal}>
                <div className={styles.modalWrap}>
                    <div className={styles.modalHeader}>
                        {props.popupType === "ingredientType" ? 
                            <h1 className={`text text_type_main-large ${styles.modalTitle}`}>Детали ингредиента</h1>
                            :
                            <p className={styles.noTitle}></p>
                        }
                        <div onClick={props.closePopup}>
                            <CloseIcon />
                        </div>
                    </div>
                    <div className={styles.contentWrap}>
                        {props.children}
                    </div>
                </div>
            </div>
        </>,
        modalRoot
    )
}

export default Modal;