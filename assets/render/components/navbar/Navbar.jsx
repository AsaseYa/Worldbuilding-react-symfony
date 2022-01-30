import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
    return (
        <div className={"navbar__container"}>
            <div className="navbar__logo">
                <NavLink to='/'><img src="https://i.imgur.com/rpFqZw7.png" alt="logo"/></NavLink>
            </div>
            <div className="navbar__menu">
                <NavLink className={'navbar_item'} to={'/'}>Accueil</NavLink>
                <NavLink className={'navbar_item'} to={'/login'}>Se connecter</NavLink>
                <NavLink className={'navbar_item'} to={'/register'}>Mon compte</NavLink>
            </div>
        </div>
    );
};

export default Navbar;