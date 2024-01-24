import { AddressProps } from '../../Types';
function Address({
  isSelected,
  index,
  name,
  city,
  address,
  isDefault,
  landmark,
  state,
  phone,
  pincode,
  onChange,
}: AddressProps) {
  return (
    <div className="mt-4 w-96 flex items-center justify-evenly px-4 py-2 bg-gray-100 rounded-md shadow-sm flex items-center space-x-4">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={e => {
          onChange(index, e.target.checked);
        }}
        className="rounded mr-2 left-4 top-4 h-4 w-4"
      />
      <div>
        <div className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300">
          {name[0]}
        </div>
      </div>
      <div className="text-sm font-medium w-8/12 truncate">
        <span className="block mb-2">{name}</span>
        <p className="text-xs text-gray-500 mb-1">{phone}</p>
        <span className="text-gray-500 text-sm font-light">{address}</span>
        <div className="text-gray-500 w-full font-light truncate">
          {landmark}
          {isDefault ? <p className="font-semibold">(DEFAULT)</p> : ''}
        </div>
        <div className="mt-1 w-full text-ellipsis">
          {city} {state}
        </div>
        <div className="mt-1 w-full text-ellipsis">{pincode}</div>
      </div>
    </div>
  );
}

export default Address;
