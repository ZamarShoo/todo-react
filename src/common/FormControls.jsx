import React from "react";
import s from './../components/element/element.module.css'

const FormControl = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;
    return (
        <div>
            <div>
                {children}
            </div>
            {hasError && <span className={s.error}>{error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}