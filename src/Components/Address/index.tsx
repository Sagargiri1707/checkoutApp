function Address(props) {
    return <div className="mt-4 w-96 flex items-center justify-evenly px-4 py-2 bg-gray-100 rounded-md shadow-sm flex items-center space-x-4">
        <input
            type="checkbox"
            checked={props.isSelected}
            onChange={(e) => props.onChange(props.index)}
            className="rounded mr-2 left-4 top-4 h-4 w-4"
        />
            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300">
                {props.name[0]}
            </div>
            <div className="text-sm font-medium">
            <span className="block mb-2">{props.name}</span> 
                <span className="text-gray-500 text-sm font-light">{props.address}</span>
            <div className="text-gray-500 font-light">  {props.landmark}  {props.isDefault ? <p className="font-semibold">(DEFAULT)</p> : ""}</div>
                <div className="mt-4">{props.city} {props.state} - {props.pincode}</div>
            </div>
    </div>
}

export default Address