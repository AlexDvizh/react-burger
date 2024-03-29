import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import styles from "./appHeader.module.css";
import { NavLink, useMatch } from 'react-router-dom';
import { useAppSelector } from '../../services/hooks';
import { RootState } from '../../services/slices';


const AppHeader: FC = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    
    return (
        <header className={styles.header}>
            <div className={styles.headerWrap}>
                <div className={styles.navigationList}>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <NavLink
                            to='/'
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            <BurgerIcon type='primary'/>
                            <p className="text text_type_main-small pl-2">Конструктор</p>
                        </NavLink>
                    </div>
                    <div className={`p-4 ${styles.navigationItem}`}>
                        <NavLink
                            to='/feed'
                            className={({ isActive }) =>
                                isActive ? styles.navLinkActive : styles.navLink
                            }
                        >
                            <ListIcon type='primary'/>
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
                        <ProfileIcon type='primary' />
                        <p className="text text_type_main-small pl-2">{user ? user.name : "Личный кабинет"}</p>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;