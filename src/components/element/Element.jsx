import React, {Fragment} from "react";
import {Field, reduxForm} from "redux-form";
import {addCheckBox, checkedPost, deleteCheck, updateHeading} from "../../redux/todo-reducer";
import {connect} from "react-redux";

const ElementForm = (props) => {


        return (
            <form onSubmit={props.handleSubmit}>
                {
                    props.checkboxes.map ( c => {

                        return (
                            <div>
                                <Field component='input'
                                       type='checkbox'
                                       name={`${ c.id }`}
                                       id={`${ c.id }`}
                                       onChange={() => props.checkedNewPost(c.id)}/>
                                <label htmlFor={`${c.id}`}>{ c.message }</label>
                                <div onClick={() => props.deleteThisCheck(c.id)}>Delete</div>
                            </div>
                        )
                    })
                }
                <div autoFocus={true}
                     onBlur={ props.deactivateEditTextarea }>
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
        heading: this.props.item.heading,
        editTextarea: false
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
        debugger
        this.props.updateHeading(this.state.heading, this.props.item.id);
    }

    activateEditTextarea = () => {
        this.setState({
            editTextarea: true
        });
    }

    deactivateEditTextarea = () => {
        this.setState({
            editTextarea: false
        });
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
        console.log(`${this.props.item.id} --- ${values.newCheckboxText}`)
        this.props.addCheckBox(this.props.item.id, values.newCheckboxText)
    }

    checkedNewPost = (id) => {
        this.props.checkedPost(this.props.item.id, id)
    }

    deleteThisCheck = (id) => {
        this.props.deleteCheck(this.props.item.id, id)
    }

    render() {

        let ElementReduxForm = reduxForm({form: `form_${this.props.item.id}`})(ElementForm)

        const { heading, checkboxes } = this.props.item

        return (
            <Fragment>
                {!this.state.editHeading &&
                    <h2 onDoubleClick={ this.activateEditHeading}>{heading}</h2>
                }
                {this.state.editHeading &&
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactivateEditHeading}
                               value={this.state.heading}/>
                    </div>
                }
                <hr />
                <ElementReduxForm deleteThisCheck={this.deleteThisCheck}
                                  checkedNewPost={this.checkedNewPost}
                                  checkboxes={checkboxes}
                                  onSubmit={ this.addNewCheckbox }
                                  activateEditTextarea={this.activateEditTextarea}
                                  deactivateEditTextarea={this.deactivateEditTextarea}
                                  inputTextarea={this.state.editTextarea} />
            </Fragment>
        )
    }
}


export default connect(null,{addCheckBox, checkedPost, deleteCheck, updateHeading})(Element)