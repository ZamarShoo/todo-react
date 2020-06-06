import React, {useState, useEffect} from "react";
import {reduxForm} from "redux-form";
import {addCheckBox, checkedPost, deleteCheck, deleteItem, updateHeading} from "../../redux/todo-reducer";
import {connect} from "react-redux";
import s from './element.module.css'
import DeleteImage from "../../common/delete";
import ElementForm from "./ElementForm";


const Element = (props) => {
    const [editHeading, setEditHeading] = useState(false)
    const [headingState, setHeading] = useState(props.item.heading)

    const activateEditHeading = () => {
        setEditHeading(true)
    };

    const deactivateEditHeading = () => {
        setEditHeading(false)
        let headText = headingState
        if (headText.length === 0) {
            headText = 'This input is required'
        }
        props.updateHeading(headText, props.item.id);
    };

    useEffect( () => {
        setHeading(props.item.heading);
    }, [props.item.heading] );

    const onStatusChange = (e) => {
        setHeading(e.currentTarget.value)
    };

    const addNewCheckbox = (values) => {
        props.addCheckBox(props.item.id, values.newCheckboxText)
    };

    const checkedNewPost = (id) => {
        props.checkedPost(props.item.id, id)
    };

    const deleteThisCheck = (id) => {
        props.deleteCheck(props.item.id, id)
    };

    const deleteElem = (id) => {
        props.deleteItem(id)
    };


    let ElementReduxForm = reduxForm({form: `form_${props.item.id}`})(ElementForm);

    return (
            <div className={`${s.item} ${(props.darkColor
                                                        ? s.darkElem
                                                        : null)}`}>
                <div className={s.delete} onClick={() => deleteElem(props.item.id)}><DeleteImage dark={props.darkColor}/></div>
                {!editHeading &&
                    <h2 onDoubleClick={activateEditHeading}>{props.item.heading}</h2>
                }
                {editHeading &&
                    <div>
                        <input onChange={onStatusChange}
                               autoFocus={true}
                               onBlur={deactivateEditHeading}
                               value={headingState}
                               type={'text'} />
                    </div>
                }
                <hr />
                <ElementReduxForm deleteThisCheck={deleteThisCheck}
                                  checkedNewPost={checkedNewPost}
                                  checkboxes={props.item.checkboxes}
                                  onSubmit={ addNewCheckbox }
                                  itemId={props.item.id}
                                  dark={props.darkColor} />
            </div>
    )

}

const mapStateToProps = (state) => ({
    darkColor: state.todo.darkColor
})



export default connect(mapStateToProps, {addCheckBox, checkedPost, deleteCheck, updateHeading, deleteItem})(Element)