import s from "./element.module.css";
import {Field} from "redux-form";
import DeleteImage from "../../common/delete";
import React from "react";

const ElementForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {
                props.checkboxes.map ( c => {

                    return (
                        <div className={s.checkBox_item} key={c.id}>
                            <Field component='input'
                                   type='checkbox'
                                   name={`${props.itemId}_${ c.id }`}
                                   id={`${props.itemId}_${ c.id }`}
                                   onChange={() => props.checkedNewPost(c.id)} />
                            <label htmlFor={`${props.itemId}_${c.id}`} className={`${(c.active ? s.checkBox_item_checked : null)}`}>
                                { c.message }
                            </label>
                            <div className={s.checkBox_delete} onClick={() => props.deleteThisCheck(c.id)}>
                                <DeleteImage dark={props.dark}/>
                            </div>
                        </div>
                    )
                })
            }
            <div className={s.textareaDiv} autoFocus={true}>
                <Field component='textarea'
                       placeholder='Enter what are you need to do'
                       name='newCheckboxText' />
                <button className={s.textareaButton}>Send</button>
            </div>
        </form>
    )
}

export default ElementForm