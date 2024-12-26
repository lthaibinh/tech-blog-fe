import type { NextApiRequest, NextApiResponse } from 'next'
 
type ResponseData = {
  message: string
}
 
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({ message: 'Hello from Next.js!' })
}

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 5,
  }