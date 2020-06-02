import React from 'react'
import Element from "../element/Element";
import {connect} from "react-redux";
import {addItem} from "../../redux/todo-reducer";
import s from './WrapperForElements.module.css'
import DeleteImage from "../../common/delete";

const WrapperForElements = (props) => {

    return(
        <div className={s.wrapper}>
            {
                props.items.map(item => {
                    return <Element item={item} key={item.id}/>
                })
            }
            <button className={s.newElem} onClick={props.addItem}><DeleteImage/></button>
        </div>
    )
}


const mapStateToProps = (state) => ({
    items: state.todo.items
})


export default connect(mapStateToProps, {addItem})(WrapperForElements)