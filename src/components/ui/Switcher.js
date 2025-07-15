import React, { Children, cloneElement, useState } from 'react';

export default function Switcher({ 
    big, 
    small, 
    className = '', 
    children, 
    value: controlledValue, 
    onChange 
}) {
    // Если value не передан, используем внутренний state
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(() => {
        // По умолчанию берем value первого ребенка, если есть
        const firstChild = Children.toArray(children)[0];
        return firstChild?.props?.value || firstChild?.key || undefined;
    });
    const value = isControlled ? controlledValue : uncontrolledValue;

    const classes = `switcher ${big ? 'big' : small ? 'small' : ''} ${className}`;

    const handleOptionClick = (optionValue) => {
        if (!isControlled) {
            setUncontrolledValue(optionValue);
        }
        if (onChange) {
            onChange(optionValue);
        }
    };

    const modifiedChildren = Children.map(children, (child) => {
        // Проверяем, что child - элемент React
        if (!React.isValidElement(child)) return child;

        // Определяем значение опции
        const optionValue = child.props.value || child.key;

        return cloneElement(child, {
            className: `option ${value === optionValue ? 'active' : ''}`,
            onClick: () => handleOptionClick(optionValue)
        });
    });

    return (
        <div className={classes}>
            {modifiedChildren}
        </div>
    )
}



{/*
    Controlled-режим
    
    const [tab, setTab] = useState('works')

    <Switcher value={tab} onChange={setTab}>
        <span value="works">Дела</span>
        <span value="projects">Проекты</span>
    </Switcher>
*/}

{/*
    Uncontrolled-режим (работает без value/onChange)

    <Switcher>
        <span value="works">Дела</span>
        <span value="projects">Проекты</span>
    </Switcher>
*/}