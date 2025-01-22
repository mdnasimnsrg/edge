export const revalidate = 0

export async function GET(req: any, { params }: any) {
  const [productId, apiId] = params.params
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1 + `/v1/apis/products/${productId}`}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    const api = await res.json()

    const targetAPIDetails = api.find((el: any) => el.id == apiId)

    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V1 + `/v1/apis/openapi`}`, {
      body: JSON.stringify(targetAPIDetails),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    })
    const APIJSON = await data.json()

    return new Response(JSON.stringify(APIJSON))
  } catch (error) {
    return new Response(JSON.stringify({}), { status: 500 })
  }
}
