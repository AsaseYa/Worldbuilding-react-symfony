import React from 'react';

const MyComponent = ({label, name, required, type, value, onChange}) => {
    return (
        <div className={`${type}_container`}>
            <input
                className={`${type}_input`}
                value={value}
                onChange={onChange}
                type={type}
                required={required}
                id={label}
                name={name}
                placeholder={''}
            />
            <label className={required ? `${type}_label required` : `${type}_label`} htmlFor={label}>{label}</label>
        </div>
    );
};

export default MyComponent;
