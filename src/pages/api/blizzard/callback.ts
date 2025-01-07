// /pages/api/blizzard/callback.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;
  const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_BNET_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_BNET_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const tokenUrl = 'https://oauth.battle.net/oauth/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  params.append('code', code as string);

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(400).json(errorData);
    }

    const data = await response.json() as { access_token: string; refresh_token: string };
    const accessToken = data.access_token;
    // Optionally, store the refresh token if you need to refresh the token later
    // const refreshToken = data.refresh_token;

    // You can store the access token in cookies, database, or session
    // For example, setting it in an HTTP-only cookie:
    res.setHeader('Set-Cookie', `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=3600`);
    // Redirect to the character selection page
    res.writeHead(302, { Location: '/character-selection' });
    res.end();

  } catch (error) {
    console.error('Error exchanging authorization code for token:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
