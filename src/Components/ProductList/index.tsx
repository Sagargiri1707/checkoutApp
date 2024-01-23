import { useContext } from 'react';
import {GlobalAppContext} from '../../Context/Context'
import Product from '../Product';

function ProductList(){
    const { initVal } = useContext(GlobalAppContext);
    const {productData} =initVal
    return  productData.map((product,id)=><Product index={id} key={product.id} {...product}/>)
}
export default ProductList