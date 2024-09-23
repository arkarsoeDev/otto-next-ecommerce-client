import { getBillboard } from "@/actions/billboard";
import { getAllProducts } from "@/actions/product";
import Billboard from "@/components/billboard";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";

export const revalidate = 0;

const HomePage = async () => {
  const { data: products } = await getAllProducts({ params: { isFeatured: true } });
  const { data: billboard } = await getBillboard("25b37201-51bd-4a2b-878f-2d5307885730");

  return (
    <Container>
      <div className="space-y-10 pb-10">
        {billboard && <Billboard data={billboard.content} />}
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          {products && <ProductList title="Featured Products" items={products.content} />}
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
