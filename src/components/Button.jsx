import React from "react";


const Button=({ onClick,value })=>{
    return(
      <button
      className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-md  border-white/20"
      onClick={onClick}
    >
      {value}
    </button>
    )
}

export default Button;