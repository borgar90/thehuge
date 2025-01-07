import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')?.value;

  if (!accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const region = 'eu'; // or 'us', 'kr', 'tw', etc.
  const namespace = `profile-${region}`;
  const locale = 'en_US'; // Optional, can be changed based on your needs

  const profileUrl = `https://${region}.api.blizzard.com/profile/user/wow?namespace=${namespace}&locale=${locale}`;

  try {
    const response = await fetch(profileUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error fetching profile data:', errorData); // Log the error response
      return NextResponse.json(errorData, { status: response.status });
    }

    const profileData = await response.json();
    return NextResponse.json(profileData, { status: 200 });

  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}