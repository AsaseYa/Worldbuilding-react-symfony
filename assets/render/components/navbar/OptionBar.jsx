import React from 'react';
import {NavLink} from "react-router-dom";

const OptionBar = () => {
    return (
        <div className={'option_bar'}>
            {/*<div className={'option_bar_path'}></div>*/}
            {/*<div className={'option_bar_search'}></div>*/}
            <div className={'option_bar_menu'}>
                <NavLink className={'option_bar_menu_item'} to={'/worlds/new'}>
                    Nouveau Monde
                </NavLink>
            </div>
        </div>
    );
};

export default OptionBar;
