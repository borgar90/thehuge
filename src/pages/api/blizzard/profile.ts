import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const accessToken = req.cookies.access_token;

  if (!accessToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const region = 'eu'; // or 'eu', 'kr', 'tw', etc.
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
      return res.status(response.status).json(errorData);
    }

    const profileData = await response.json();
    return res.status(200).json(profileData);

  } catch (error) {
    console.error('Error fetching profile data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}