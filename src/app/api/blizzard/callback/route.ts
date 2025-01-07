import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { URLSearchParams } from 'url';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_BNET_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_BNET_REDIRECT_URI;

  if (!code || !clientId || !clientSecret || !redirectUri) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const tokenUrl = 'https://oauth.battle.net/oauth/token';

  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  params.append('redirect_uri', redirectUri);
  params.append('code', code);

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
      return NextResponse.json(errorData, { status: 400 });
    }

    const data = await response.json() as { access_token: string; refresh_token: string };
    const accessToken = data.access_token;

    // Set the access token in an HTTP-only cookie
    const responseHeaders = new Headers();
    responseHeaders.append('Set-Cookie', `access_token=${accessToken}; HttpOnly; Path=/; Max-Age=3600`);

    // Construct the absolute URL for redirection
    const origin = req.nextUrl.origin;
    const redirectUrl = `${origin}/character-selection`;

    // Redirect to the character selection page
    return NextResponse.redirect(redirectUrl, { headers: responseHeaders });

  } catch (error) {
    console.error('Error exchanging authorization code for token:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}