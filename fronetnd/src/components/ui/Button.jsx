//this component can be reused anywhere in quiz app

import React from 'react'
import clsx from "clsx"

const Button = (props) => {
    //destructure props for easier usage
    const
    {
        children,
        size,
        loading,
        disabled,
        onClick =() =>{},
        loadingText = "Loading...",
        icon,
        iconPosition
    } = props;

    //decide button styling classes
    const buttonClass = clsx("btn", size,{loading,disabled})
    ///if size = "large" and loading = true => class become => "btn large loading"
  return (
    <button  onClick={onClick} className={buttonClass}>
      {loading ? loadingText : children}
      {!loading && iconPosition === "right" && icon} 
       {/* if button is loading => hide icon
       if noth loading and ip is rigt then show icon */}
    </button>
  )
}

export default Button
