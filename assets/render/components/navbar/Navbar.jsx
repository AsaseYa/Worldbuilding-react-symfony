import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    const menuItem = [
        ['Accueil', '/'],
        ['Se connecter', '/login'],
        ['Mon compte', '/register']
    ]
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