import Billboard from "@/components/billboard"
import Container from "@/components/ui/container"
import NoResults from "@/components/ui/no-results"
import Filter from "./components/filter"
import ProductCard from "@/components/ui/product-card"
import MobileFilters from "./components/mobile-filters"
import { getAllProducts } from "@/actions/product"
import { getAllColors } from "@/actions/color"
import { getAllSizes } from "@/actions/size"
import { getCategory } from "@/actions"

export const revalidate = 0

interface CategoryPageProps {
    params: {
        categoryId: string
    },
    searchParams: {
        colorId: string
        sizeId: string
    }
}

const CategoryPage: React.FC<CategoryPageProps> = async ({
    params,
    searchParams
}) => {
    const getProductParams = () => {
        let obj: { categoryId: string, colorId?: string, sizeId?: string } = { categoryId: params.categoryId }
        if (searchParams.colorId && searchParams.colorId !== 'undefined') {
            obj.colorId = searchParams.colorId
        }

        if (searchParams.sizeId && searchParams.sizeId !== 'undefined') {
            obj.sizeId = searchParams.sizeId
        }

        return obj
    }

    const { data: products } = await getAllProducts({
        params: getProductParams()
    });
    const { data: sizes } = await getAllSizes();
    const { data: colors } = await getAllColors();
    const { data: category } = await getCategory(params.categoryId);

    return (
        <div className="bg-white">
            <Container>
                {category && category.content.billboard && <Billboard data={category.content.billboard} />}
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        {
                            sizes && colors && <MobileFilters sizes={sizes.content} colors={colors.content} />
                        }
                        <div className="hidden lg:block">
                            {sizes && <Filter valueKey="sizeId" name="Sizes" data={sizes.content} />}
                            {colors && <Filter valueKey="colorId" name="Colors" data={colors.content} />}
                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products && products.content.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products && products.content.map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default CategoryPage;
