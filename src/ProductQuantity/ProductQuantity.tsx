function ProductQuantity({ index ,onChange}){
    return <div className="flex items-center justify-center w-12 bg-white rounded-md">
        <button type="button" disabled={index == 0} onClick={() => onChange('-')} className="text-lg text-gray-400 hover:text-gray-500 focus:outline-none font-bold">
            -
        </button>
        <span className="mx-2 text-lg text-gray-700 font-bold">{index}</span>
        <button type="button" onClick={() => onChange('+')} className="text-lg text-gray-400 hover:text-gray-500 focus:outline-none font-bold">
            +
        </button>
    </div>
}

export default ProductQuantity