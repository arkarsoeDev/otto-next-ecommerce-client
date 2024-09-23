import { getAllProducts, getProduct } from "@/actions/product";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

interface ProductPagesProps {
  params: {
    productId: string;
  }
}

const ProductPage: React.FC<ProductPagesProps> = async ({
  params
}) => {
  const { data: product } = await getProduct(params.productId);
  const { data: suggestedProducts } = await getAllProducts({
    params: {
      categoryId: product?.content?.category?.id
    }
  })

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {product && <Gallery images={product.content.images} />}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              {product && <Info data={product.content} />}
            </div>
          </div>
          <hr className="my-6" />
          {suggestedProducts && <ProductList title="Related Items" items={suggestedProducts.content} />}
        </div>
      </Container>
    </div>
  );
}

export default ProductPage;
