import { FC } from "react";

interface IProps {
    type: string;
    name: string;
    placeholder?: string;
    onChange: () => void;
    style?: {};
    value?: string | number;
    className?: string;
};

export const WebInput: FC<IProps> = ({ type, name, placeholder, onChange, style, value, className }) => {
    return (
        <input type={type} name={name} placeholder={placeholder} onChange={() => onChange} style={style} value={value} id={className} />
    );
};