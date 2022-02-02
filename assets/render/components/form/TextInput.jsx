import React from 'react';

const MyComponent = ({label, name, required, type, value, onChange}) => {
    return (
        <div id={`input_container_${label}`} className={'input_container'} >
            <input
                value={value}
                onChange={onChange}
                type={type}
                required={required}
                id={label}
                name={name}
                placeholder={''}
            />
            <label className={required ? 'required' : ''} htmlFor={label}>{label}</label>
        </div>
    );
};

export default MyComponent;
