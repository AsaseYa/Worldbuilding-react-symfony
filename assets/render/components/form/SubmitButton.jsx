import React from 'react';

const SubmitButton = ({value}) => {
    return (
        <button type={'submit'} className={'submit_button'}>
            <span/>
            <span/>
            <span/>
            <span/>
            {value}
        </button>
    );
};

export default SubmitButton;
