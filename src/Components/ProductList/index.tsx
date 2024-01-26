import { useContext } from 'react';
import { GlobalAppContext } from '../../Context/Context';
import Product from '../Product';
import { withErrorBoundary } from '../../HOC/errorBoundaryHoc';

function ProductList() {
  const { productDetails } = useContext(GlobalAppContext);
  const { productData } = productDetails;
  return (
    <div>
      {productData.length !== 0 ? (
        productData.map((product, id) => (
          <Product index={id} key={product.id} {...product} />
        ))
      ) : (
        <div>
          {productDetails?.loading ? 'Loading' : 'Your Cart is empty'}
        </div>
      )}
    </div>
  );
}
export default withErrorBoundary('ProductList', ProductList);
