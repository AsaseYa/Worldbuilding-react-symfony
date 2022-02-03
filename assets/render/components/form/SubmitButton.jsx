import React from 'react';

const SubmitButton = ({value, onClick}) => {
    return (
        <button type={'submit'} onClick={onClick ? onClick : ''} className={'submit_button'}>
            <span/>
            <span/>
            <span/>
            <span/>
            {value}
        </button>
    );
};

export default SubmitButton;
