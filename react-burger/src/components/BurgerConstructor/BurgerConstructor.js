import { ConstructorElement, Button, DragIcon, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useMemo, useState } from 'react';
import PropTypes from "prop-types";
import { ingredientPropTypes } from "../../utils/prop-types";
import Modal from '../Modal/Modal';
import OrderDetails from '../Modal/OrderDetails';
import styles from "./burgerConstructor.module.css";

const BurgerConstructor = (props) => {
    const orderType = "orderType";
    const [popupOpen, setPopupOpen] = useState(false);
    
    const bunElement = useMemo(() => {
        return props.burgersInfo.find((element) => element.type === "bun");
    }, [props.burgersInfo]) 
    const anotherElements = props.burgersInfo.filter((element) => element.type !== "bun");
    
    function handlePopupClose() {
        setPopupOpen(false);
    }

    function handlePopupOpen() {
        setPopupOpen(true);
    }
    
    return (
        <section className={styles.constructor}>
            <div className={styles.constructorWrap}>
                <div className={styles.itemWrap}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={`${bunElement.name} (верх)`}
                        price={bunElement.price}
                        thumbnail={bunElement.image}
                        
                    />
                </div>
                
                <div className={styles.scrollableBox}>
                    {anotherElements.map((element) => {
                        return(
                            <div key={element._id} className={styles.item}>
                                <DragIcon type="primary" className="icon"/>
                                <ConstructorElement
                                    text={element.name}
                                    price={element.price}
                                    thumbnail={element.image}
                                />
                            </div>
                        )
                        })
                    }
                </div>
                <div className={styles.itemWrap}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={`${bunElement.name} (низ)`}
                        price={bunElement.price}
                        thumbnail={bunElement.image}
                    />
                </div>
            </div>
            <div className={styles.info}>
                <p className="text text_type_digits-medium mr-2">100500</p>
                <div className={styles.image}>
                    <CurrencyIcon type="primary"/>
                </div>
                <div onClick={handlePopupOpen}>
                    <Button htmlType="button" type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </div>
            {popupOpen &&
                <Modal 
                    closePopup={handlePopupClose}
                    popupType={orderType}
                >
                    <OrderDetails ingredient={props.ingredient}/>
                </Modal>
            }
            
        </section>
    )
}

BurgerConstructor.propTypes = {
    burgersInfo: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;