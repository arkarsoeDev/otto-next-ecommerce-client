'use server'

import { validateResponse } from "@/core/validate-response"
import { httpClient } from "@/lib/http-client"
import { routeTags } from "@/core/route-tag"
import { BasePayload } from "./base/base-payload"
import { revalidatePath, revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

const baseUrl = 'api/payment'


export interface CheckoutPayload extends BasePayload {
  // isPaid: boolean;
  // phone: string;
  // address: string;
  cart: {
    productId: string
    price: number
    quantity: number
  }[]
}


export const checkout = async (payload: CheckoutPayload) => {
  const url = `${process.env.BASE_URL}/${baseUrl}/checkout`

  let res = await httpClient.post(url, {
    body: JSON.stringify({ cart: payload.cart, storeId: process.env.STORE_ID }),
  });

  const result = await validateResponse(res)

  if (result) {
    throw new Error(result.message)
  }

  const data = await res.json()

  redirect(data.url)
}
