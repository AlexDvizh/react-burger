import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from "./appHeader.module.css";

const AppHeader = () => {
    
    return (
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={styles.navigationList}>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <BurgerIcon type="primary" className=""/>
                        <p className="text text_type_main-small pl-2">Конструктор</p>
                    </div>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-small text_color_inactive pl-2">Лента заказов</p>
                    </div>
                    
                </div>
                <div className={`m-4 ${styles.logo} ${styles.navigationItem}`}>
                    <Logo />
                </div>
                <div className={`p-4 ${styles.navigationItem}`}>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-small text_color_inactive pl-2">Личный кабинет</p>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;