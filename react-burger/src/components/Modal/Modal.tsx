import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from './ModalOverlay';

const modalRoot = document.getElementById('modals');

function Modal({
    handleModalClose,
    title,
    children,
  }: {
    handleModalClose: () => void;
    title?: string;
    children: React.ReactNode;
  }): JSX.Element  {
    
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent | React.KeyboardEvent) {
            if(event.code === "Escape") {
                handleModalClose();
            }
        }
        document.body.addEventListener("keydown", handleKeyDown);
        
        return () => {
          document.body.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleModalClose]);
    
    return ReactDOM.createPortal(
        <>
            <ModalOverlay onClose={handleModalClose}/>
            <div className={styles.modal}>
                <div className={styles.modalWrap}>
                    <div className={styles.modalHeader}>
                        { title ? 
                            <h1 className={`text text_type_main-large ${styles.modalTitle}`}>{title}</h1>
                            :
                            <p className={styles.noTitle}></p>
                        }
                        <div onClick={handleModalClose}>
                            <CloseIcon type="primary"/>
                        </div>
                    </div>
                    <div className={styles.contentWrap}>
                        {children}
                    </div>
                </div>
            </div>
        </>,
        modalRoot as HTMLElement
    )
}

export default Modal;