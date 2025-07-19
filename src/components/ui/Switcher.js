import React, { Children, cloneElement } from 'react';

export default 'TEST-DEFAULT';

export function Switcher({ big, small, className = '', children, value, onChange }) {
    const classes = `switcher ${big ? 'big' : small ? 'small' : ''} ${className}`;

    const modifiedChildren = Children.map(children, child =>
        React.isValidElement(child) ?
        cloneElement(child, {
            className: `${value === (child.props.value ?? child.key) ? 'active' : ''}`,
            onClick: () => onChange?.(child.props.value ?? child.key)
        })
        : child
    );

    return (
        <div className={classes}>
            {modifiedChildren}
        </div>
    )
}

export function Option({ children, value, className = '', ...props }) {
    return (
        <span value={value} className={`link option ${className}`} {...props}>
            {children}
        </span>
    );
}

{/*
    Пример использования:
    
    import { Switcher, Option } from '@/components/ui/Switcher';
    
    const [activeTab, setActiveTab] = useState('works')

    <Switcher value={activeTab} onChange={setActiveTab}>
        <Option value="works">Работы</Option>
        <Option value="projects">Проекты</Option>
        <Option value="tasks">Задачи</Option>
    </Switcher>
*/}