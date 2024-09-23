'use server'

import { Order } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"
import { BasePayload } from "./base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import Stripe from "stripe"

const baseUrl = 'api/orders'

interface GetAllOrdersPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

export const getAllOrders = async (payload?: GetAllOrdersPayload): Promise<ApiPaginatedResponse<Order>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getOrders()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getOrder = async (id: string): Promise<ApiResponse<Order>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}/${id}`

  res = await httpClient.get(url);

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

