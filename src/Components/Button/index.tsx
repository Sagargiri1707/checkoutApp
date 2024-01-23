
function Button({ text, onChange, id, type, color, disabled, customClass }) {
    return (
        <button 
        type={type || "button"}
        disabled={disabled} 
            onClick={(e) => { onChange(e,id) }} 
            className={`inline-flex items-center px-4 py-1 text-white font-bold rounded shadow-sm ${customClass ? customClass :""} ${disabled ? "bg-gray-400 cursor-not-allowed" : `bg-${color||"blue"}-400 hover:bg-${color || "blue"}-600`}`}>
            {text}
        </button>
    );
}

export default Button;
