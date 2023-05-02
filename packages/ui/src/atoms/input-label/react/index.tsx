import { FC } from "react";

import { WebInput } from "../../input/react";

interface IProps {
    type: string;
    name: string;
    placeholder?: string;
    onChange: () => void;
    style?: {};
    value?: string | number;
    label?: string;
    customLabel?: JSX.Element;
    error?: any,
    className?: string;
};

export const WebInputLabel: FC<IProps> = ({ type, name, placeholder, onChange, style, value, label, customLabel, error, className }) => {
    return (
        <label htmlFor="">
            {customLabel ? customLabel: <p>{label}</p>}
            <WebInput type={type} name={name} placeholder={placeholder} onChange={() => onChange} style={style} value={value} className={className} />
            <p>{error}</p>
        </label>
    );
};