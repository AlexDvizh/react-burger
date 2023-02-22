import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import styles from "./modal.module.css";
import ModalOverlay from './ModalOverlay';

const modalRoot = document.getElementById('modals');

const Modal = (props) => {
    
    useEffect(() => {
        function handleKeyDown(event) {
            if(event.code === "Escape") {
                props.handleModalClose();
            }
        }
        document.body.addEventListener("keydown", handleKeyDown);
        
        return () => {
          document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={props.handleModalClose}/>
            <div className={styles.modal}>
                <div className={styles.modalWrap}>
                    <div className={styles.modalHeader}>
                        {props.title ? 
                            <h1 className={`text text_type_main-large ${styles.modalTitle}`}>{props.title}</h1>
                            :
                            <p className={styles.noTitle}></p>
                        }
                        <div onClick={props.handleModalClose}>
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

// Modal.propTypes = {
//     closePopup: PropTypes.func.isRequired,
//     title: PropTypes.string,
//     children: PropTypes.element.isRequired,
// };

export default Modal;