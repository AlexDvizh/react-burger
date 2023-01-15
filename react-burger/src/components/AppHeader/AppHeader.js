import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import './AppHeader.css';

const AppHeader = () => {
    
    return (
        <header className='header'>
            <div className='header-wrap'>
                <div className='navigation-list'>
                    <div className='navigation-item p-4'>
                        <BurgerIcon type="primary" className=""/>
                        <p className="text text_type_main-small pl-2 navigation-item-size">Конструктор</p>
                    </div>
                    <div className='navigation-item p-4'>
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-small text_color_inactive pl-2 navigation-item-size">Лента заказов</p>
                    </div>
                    
                </div>
                <div className='logo m-4'>
                    <Logo />
                </div>
                <div className='navigation-item p-4'>
                    <ProfileIcon type="secondary" />
                    <p className="text text_type_main-small text_color_inactive pl-2 navigation-item-size">Личный кабинет</p>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;