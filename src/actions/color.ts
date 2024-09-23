'use server'

import { Color } from "@/core/models"
import { ApiPaginatedResponse, ApiResponse } from "@/core/response/response"
import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"

const baseUrl = 'api/colors'

interface GetAllColorsPayload {
  params: {
    storeId?: string,
    limit?: number
  }
}

export const getAllColors = async (payload?: GetAllColorsPayload): Promise<ApiPaginatedResponse<Color>> => {

  let res: Response | null = null
  let error: BaseError | null = null
  let data = null

  const url = `${process.env.BASE_URL}/${baseUrl}`

  res = await httpClient.get(url, { params: payload?.params, next: { tags: [routeTags.getColors()] } });

  error = await validateResponse(res)

  console.log(error)

  if (!error) {
    data = await res.json()
  }

  return { data, error }
}

export const getColor = async (id: string): Promise<ApiResponse<Color>> => {

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
