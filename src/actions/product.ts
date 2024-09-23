'use server'

import { Product } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/products'

interface GetAllProductsPayload {
  params: {
    storeId?: string,
    limit?: number,
    isFeatured?: boolean
    categoryId?: string,
    colorId?: string,
    sizeId?: string,
  }
}

export const getAllProducts = async (payload?: GetAllProductsPayload): Promise<ApiPaginatedResponse<Product>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getProducts()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  console.log(data)

  return { data, error }
}

export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/${id}`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}
