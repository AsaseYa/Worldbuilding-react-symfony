import React from 'react';

const MyComponent = ({label, name, required, type, value, onChange}) => {
    return (
        <div className={`input_container_${label}`}>
            <label className={required ? 'required' : ''} htmlFor={label}>{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                required={required}
                id={label}
                name={name}
            />
        </div>
    );
};

export default MyComponent;
