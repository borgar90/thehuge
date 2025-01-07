import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  
  const clientId = process.env.BLIZZARD_CLIENT_ID;
  const redirectUri = process.env.BLIZZARD_REDIRECT_URI;

  if (!clientId || !redirectUri || !state || !process.env.NODE_ENV ) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  

  res.status(200).json({ authUrl });
}
