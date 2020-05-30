import React, {Fragment} from "react";
import {connect} from "react-redux";
import { addCheckBox, checkedPost, deleteCheck, updateHeading } from "../../redux/todo-reducer";
import {Field, reduxForm} from "redux-form";y

const ElementForm = (props) => {


        return (
            <form onSubmit={props.handleSubmit}>
                {
                    props.items.checkboxes.map ( c => {

                        return (
                            <div>
                                <Field component='input'
                                       type='checkbox'
                                       name={`${ c.id }`}
                                       id={`${ c.id }`}
                                       onChange={() => props.checkedPost(c.id)}/>
                                <label htmlFor={`${c.id}`}>{ c.message }</label>
                                <div onClick={() => props.deleteThisCheck(c.id)}>Delete</div>
                            </div>
                        )
                    })
                }
                {!props.inputTextarea &&
                    <div onDoubleClick={ props.activateEditTextarea }>Add new Checkbox</div>
                }
                {props.inputTextarea &&
                <div autoFocus={true}
                     onBlur={ props.deactivateEditTextarea }>
                    <Field component='textarea'
                           placeholder='Enter your message'
                           name='newCheckboxText' />
                    <button>Send</button>
                </div>
                }
            </form>
        )
}

let ElementReduxForm = reduxForm({form: 'checkboxesAddForm'})(ElementForm)

class Element extends React.Component {
    state = {
        editHeading: false,
        heading: this.props.items.heading,
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
        this.props.updateHeading(this.state.heading);
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

        if (prevProps.items.heading !== this.props.items.heading) {
            this.setState({
                heading: this.props.items.heading
            });
        }
    }

    onStatusChange = (e) => {
        this.setState({
            heading: e.currentTarget.value
        });
    }

    addNewCheckbox = (values) => {
        this.props.addCheckBox(values.newCheckboxText)
    }

    checkedNewPost = (id) => {
        this.props.checkedPost(id)
    }

    deleteThisCheck = (id) => {
        this.props.deleteCheck(id)
    }

    render() {

        return (
            <Fragment>
                {!this.state.editHeading &&
                    <h2 onDoubleClick={ this.activateEditHeading}>{this.props.items.heading}</h2>
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
                                  checkedPost={this.checkedNewPost}
                                  items={this.props.items}
                                  onSubmit={ this.addNewCheckbox }
                                  activateEditTextarea={this.activateEditTextarea}
                                  deactivateEditTextarea={this.deactivateEditTextarea}
                                  inputTextarea={this.state.editTextarea} />
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    items: state.todo.items
})


export default connect(mapStateToProps, { addCheckBox, checkedPost, deleteCheck, updateHeading } )(Element)