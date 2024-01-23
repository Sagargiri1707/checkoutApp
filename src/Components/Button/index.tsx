
function Button({ text, onChange, id, color }) {
    return (
        <button onClick={() => { onChange(id) }} className={`inline-flex items-center px-4 py-1 bg-${color}-400 text-white font-bold rounded shadow-sm hover:bg-${color}-600`}>
            {text}
        </button>
    );
}

export default Button;
