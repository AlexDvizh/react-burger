import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import ModalOverlay from './ModalOverlay';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';

const modalRoot = document.getElementById('modals');

function Modal({
    handleModalClose,
    title,
    showId = false,
    isProfileOrder,
    children,
    }: {
    handleModalClose: () => void;
    title?: string;
    showId: boolean;
    isProfileOrder: boolean;
    children: React.ReactNode;
    }): JSX.Element {
    const { id } = useParams();
    const orderNumber = useAppSelector(
        !isProfileOrder
            ? (store) => store.wsFeed.orders.find((el) => el._id === id)
            : (store) => store.wsProfile.orders.find((el) => el._id === id)
    )?.number;
    
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
                    <div className={styles.modalHeader} data-test="modal-title">
                        { title ? 
                            <h1 className={`text text_type_main-large ${styles.modalTitle}`}>{title}</h1>
                            :
                            <p className={styles.noTitle}></p>
                        }
                        {showId && (
                            <h1 className="text text_type_digits-default">#{orderNumber}</h1>
                        )}
                        <p
                            onClick={handleModalClose}
                            id="close-btn"
                            className={styles.close_btn}
                        >
                            <CloseIcon type="primary" />
                        </p>
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