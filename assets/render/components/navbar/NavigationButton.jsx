import React from 'react';
import {NavLink} from "react-router-dom";

const NavigationButton = ({value, path}) => {
    return (
        <NavLink to={path} className={'offset'}>{value}</NavLink>
        /*
            <div className="button-container-2">
                <span className="mas">MASK2</span>
                <button type="button" name="Hover">MASK2</button>
            </div>

            <div className="button-container-3">
                <span className="mas">MASK3</span>
                <button type="button" name="Hover">MASK3</button>
            </div>*/
    );
};

export default NavigationButton;
