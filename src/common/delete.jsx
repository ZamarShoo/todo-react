import React from "react";
import deleteImage from './../images/delete-icon.svg'
import deleteImageDark from './../images/delete-icon-dark.svg'

const DeleteImage = (props) => {
    return <img src={(props.dark ? deleteImageDark : deleteImage)} alt={'delete'}/>
}

export default DeleteImage