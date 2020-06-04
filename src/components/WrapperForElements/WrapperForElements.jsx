import React from 'react'
import Element from "../element/Element";
import {connect} from "react-redux";
import {addItem, changeColor} from "../../redux/todo-reducer";
import s from './WrapperForElements.module.css'
import DeleteImage from "../../common/delete";

const WrapperForElements = (props) => {

    return(
        <div className={`${s.wrapper} ${props.darkColor ? s.darkWrapper : null}`}>
            {
                props.items.map(item => {
                    return <Element item={item} key={item.id}/>
                })
            }
            <div className={s.fixedElement}>
                <button className={s.newElem} onClick={props.addItem}><DeleteImage dark={props.darkColor}/></button>
                <button className={s.colorChange} onClick={props.changeColor}></button>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({
    items: state.todo.items,
    darkColor: state.todo.darkColor
})


export default connect(mapStateToProps, {addItem, changeColor})(WrapperForElements)