// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const headers = {
    'X-Shopify-Access-Token': req.body.accessToken,
  }
  try {
    console.log(`method: ${req.method}`)
    console.log(`Shop fetch url: ${process.env['NEXT_PUBLIC_SHOP_FETCH_URL']}`)
    const response = await fetch(process.env['NEXT_PUBLIC_SHOP_FETCH_URL'] ?? '', { method: 'GET', headers });
    if (response.ok) {
      const shopData = await response.json();
      res.status(200).json(shopData)
    } else {
      console.log(`Error fetching store data: ${response.status}`);
      res.status(500)
    }
  } catch (error) {
    console.error(`Error fetching store data: ${error}`);
    res.status(500)
  }
}
