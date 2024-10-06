import { useGetSiteProductsQuery } from "../../../../redux/slices/shared/apiSlice";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductsList = () => {
  const { data: products } = useGetSiteProductsQuery();

  console.log("products", products);

  return (
    <div className="products-list">
      {products?.data?.product.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsList;
