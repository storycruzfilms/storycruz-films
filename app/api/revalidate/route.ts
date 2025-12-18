import { revalidateTag } from 'next-cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad Request', { status: 400 })
    }

    // This clears the cache for all data fetched with Sanity
    revalidateTag(body._type)
    
    return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(), 
        type: body._type 
    })
  } catch (err: any) {
    console.error(err)
    return new NextResponse(err.message, { status: 500 })
  }
}