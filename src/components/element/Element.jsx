import React from "react";
import {Field, reduxForm} from "redux-form";
import {addCheckBox, checkedPost, deleteCheck, deleteItem, updateHeading} from "../../redux/todo-reducer";
import {connect} from "react-redux";
import s from './element.module.css'
import DeleteImage from "../../common/delete";

const ElementForm = (props) => {

        return (
            <form onSubmit={props.handleSubmit}>
                {
                    props.checkboxes.map ( c => {

                        return (
                            <div className={s.checkBox_item} key={c.id}>
                                <Field component='input'
                                       type='checkbox'
                                       name={`${ c.id }`}
                                       id={`${ c.id }`}
                                       onChange={() => props.checkedNewPost(c.id)} />
                                <label className={`${(
                                    c.active ? s.checkBox_item_checked : null
                                )}`}>{ c.message }</label>
                                <div className={s.checkBox_delete} onClick={() => props.deleteThisCheck(c.id)}><DeleteImage/></div>
                            </div>
                        )
                    })
                }
                <div className={s.textareaDiv} autoFocus={true}>
                    <Field component='textarea'
                           placeholder='Enter your message'
                           name='newCheckboxText' />
                    <button>Send</button>
                </div>
            </form>
        )
}

class Element extends React.Component {
    state = {
        editHeading: false,
        heading: this.props.item.heading
    }

    activateEditHeading = () => {
        this.setState({
            editHeading: true
        });
    }

    deactivateEditHeading = () => {
        this.setState({
            editHeading: false
        });
        this.props.updateHeading(this.state.heading, this.props.item.id);
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.item.heading !== this.props.item.heading) {
            this.setState({
                heading: this.props.item.heading
            });
        }
    }

    onStatusChange = (e) => {
        this.setState({
            heading: e.currentTarget.value
        });
    }

    addNewCheckbox = (values) => {
        this.props.addCheckBox(this.props.item.id, values.newCheckboxText)
    }

    checkedNewPost = (id) => {
        this.props.checkedPost(this.props.item.id, id)
    }

    deleteThisCheck = (id) => {
        this.props.deleteCheck(this.props.item.id, id)
    }

    deleteElem = (id) => {
        this.props.deleteItem(id)
    }

    render() {

        let ElementReduxForm = reduxForm({form: `form_${this.props.item.id}`})(ElementForm)

        const { id, heading, checkboxes } = this.props.item

        return (
            <div className={s.item}>
                <div className={s.delete} onClick={() => this.deleteElem(id)}><DeleteImage/></div>
                {!this.state.editHeading &&
                    <h2 onDoubleClick={ this.activateEditHeading}>{heading}</h2>
                }
                {this.state.editHeading &&
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditHeading}
                               value={this.state.heading}
                        type={'text'}/>
                    </div>
                }
                <hr />
                <ElementReduxForm deleteThisCheck={this.deleteThisCheck}
                                  checkedNewPost={this.checkedNewPost}
                                  checkboxes={checkboxes}
                                  onSubmit={ this.addNewCheckbox } />
            </div>
        )
    }
}


export default connect(null,{addCheckBox, checkedPost, deleteCheck, updateHeading, deleteItem})(Element)