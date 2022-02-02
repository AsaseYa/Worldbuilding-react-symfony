import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

const SideNavbar = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(async () => {
        let token = localStorage.getItem("token");
        if (token) {
            await setIsLogin(true);
        } else {
            await setIsLogin(false);
        }
    }, [])

    let menuItem = [
        ['Accueil', '/'],
        ['Se connecter', '/login'],
        ['Mon compte', '/register'],
    ]

    if (isLogin) {
        menuItem = [
            ['Accueil', '/'],
            ['Mes Mondes', '/worlds'],
            ['Mon compte', '/profil'],
        ]
    }

    const disconnect = () => {
        localStorage.clear();
        setIsLogin(false);
        return navigate('/');
    }

    return (
        <div className={'side_navbar_container'}>
            <div className="side_navbar_logo">
                <NavLink to='/'><img src="https://i.imgur.com/rpFqZw7.png" alt="logo"/></NavLink>
            </div>
            <div className={'side_navbar_menu'}>
                <div className={'side_navbar_upper_items'}>
                    {menuItem.map((el) => {
                        return <NavLink className={'navbar_item'} key={el[0]} to={el[1]}>{el[0]}</NavLink>
                    })}
                </div>
                <div className={'side_navbar_lower_items'}>
                    <button className={'navbar_item'} onClick={disconnect}>Se déconnecter</button>
                </div>
            </div>
        </div>
    );
};

export default SideNavbar;