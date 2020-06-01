import React, {Fragment} from 'react'
import Element from "../element/Element";
import {connect} from "react-redux";
import {addItem} from "../../redux/todo-reducer";

const WrapperForElements = (props) => {

    return(
        <Fragment>
            {
                props.items.map(item => {
                    return <Element item={item} />
                })
            }
            <button onClick={props.addItem}>Добавить новый элемент</button>
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    items: state.todo.items
})


export default connect(mapStateToProps, {addItem})(WrapperForElements)