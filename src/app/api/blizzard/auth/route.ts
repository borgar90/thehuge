import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Helper function to generate a random state
const generateState = (): string => {
  return crypto.randomBytes(16).toString('hex');
};

export async function GET(req: NextRequest) {
  const state = generateState();
  // Get client credentials from environment variables
  const clientId = process.env.NEXT_PUBLIC_BNET_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_BNET_CLIENT_SECRET;
  const redirectUri = process.env.NEXT_PUBLIC_BNET_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri || !state) {
    return NextResponse.json({ error: 'Missing environment variables' }, { status: 500 });
  }

  const authUrl = `https://oauth.battle.net/authorize?client_id=${clientId}&grant_type=client_credentials&redirect_uri=${redirectUri}&state=${state}&response_type=code&scope=wow.profile`;

  try {
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Error generating authorization URL:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}