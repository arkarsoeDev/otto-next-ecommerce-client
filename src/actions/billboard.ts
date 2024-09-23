'use server'

import { Billboard } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { BasePayload } from "./base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/billboards'

interface GetAllBillboardsPayload {
  params: {
    storeId?: string,
    limit?: number,
    term: string,
  }
}

export const getAllBillboards = async (payload?: GetAllBillboardsPayload): Promise<ApiPaginatedResponse<Billboard>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getBillboards()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getBillboard = async (id: string): Promise<ApiResponse<Billboard>> => {

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
