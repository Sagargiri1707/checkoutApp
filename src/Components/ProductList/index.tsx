import { useContext } from 'react';
import {GlobalAppContext} from '../../Context/Context'
import Product from '../Product';

function ProductList(){
    const { productDetails } = useContext(GlobalAppContext);
    const { productData } = productDetails
    return productData.length!==0?  productData.map((product,id)=><Product index={id} key={product.id} {...product}/>):"No item has been added to cart"
}
export default ProductList