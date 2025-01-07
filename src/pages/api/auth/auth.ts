// /pages/api/blizzard/auth.ts

import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

// Helper function to generate a random state
const generateState = (): string => {
  return crypto.randomBytes(16).toString('hex');
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 

  const state = generateState();
  // Get client credentials from environment variables
  const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_BNET_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_BNET_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri || !state) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  const authUrl = `https://oauth.battle.net/authorize?client_id=${clientId}&grant_type=client_credentials&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=wow.profile`;

  try {
    res.writeHead(302, {
      Location: authUrl,
    });
    res.end();
  } catch (error) {
    console.error('Error generating authorization URL:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
}

