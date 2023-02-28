import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from "./appHeader.module.css";
import { useSelector } from "react-redux";
import { NavLink, useMatch } from 'react-router-dom';


const AppHeader: FC = () => {
    const user = useSelector((state) => state.user.user);
    const userName = user.username ? user.username : "Личный кабинет";

    const isConstructor = !!useMatch({ path: '/', exact: true });
    const isHistory = !!useMatch('/history');
    const isProfile = !!useMatch('/profile');
    
    return (
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={styles.navigationList}>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <NavLink
                            exact="true"
                            to='/'
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            <BurgerIcon type={isConstructor ? 'primary' : 'secondary'}/>
                            <p className="text text_type_main-small pl-2">Конструктор</p>
                        </NavLink>
                    </div>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <NavLink
                            to='/history'
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            <ListIcon type={isHistory ? 'primary' : 'secondary'}/>
                            <p className="text text_type_main-small pl-2">Лента заказов</p>
                        </NavLink>
                    </div>
                    
                </div>
                <div className={`m-4 ${styles.logo} ${styles.navigationItem}`}>
                    <Logo />
                </div>
                <div className={`p-4 ${styles.navigationItem}`}>
                    <NavLink
                        to='/profile'
                        className={({ isActive }) =>
                            isActive ? styles.navLinkActive : styles.navLink
                        }
                    >
                        <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
                        <p className="text text_type_main-small pl-2">{userName}</p>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;