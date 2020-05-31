import React, {Fragment} from 'react'
import Element from "../element/Element";
import {connect} from "react-redux";

const WrapperForElements = (props) => {

    return(
        <Fragment>
            {
                props.items.map(item => {
                    return <Element item={item} />
                })
            }
        </Fragment>
    )
}


const mapStateToProps = (state) => ({
    items: state.todo.items
})


export default connect(mapStateToProps, {})(WrapperForElements)