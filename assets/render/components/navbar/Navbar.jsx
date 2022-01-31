import React, {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import axios from "axios";
import jwt from "jwt-decode";

const Navbar = () => {
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
        ['Mon compte', '/register']
    ]

    if (isLogin) {
        menuItem = [
            ['Accueil', '/'],
            ['Mon compte', '/profil']
        ]
    }

    return (
        <div className={"navbar__container"}>
            <div className="navbar__logo">
                <NavLink to='/'><img src="https://i.imgur.com/rpFqZw7.png" alt="logo"/></NavLink>
            </div>
            <div className="navbar__menu">
                {menuItem.map((el) => {
                    return <NavLink className={'navbar_item'} key={el[0]} to={el[1]}>{el[0]}</NavLink>
                })}
            </div>
        </div>
    );
};

export default Navbar;