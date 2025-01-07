// pages/api/auth/blizzard.js
export default async function handler(req, res) {
  const { query } = req;
  const { code } = query; // Get the code from Blizzard's callback

  if (!code) {
    // Redirect to Blizzard's OAuth page
    const clientId = process.env.BLIZZARD_CLIENT_ID;
    const redirectUri = process.env.BLIZZARD_REDIRECT_URI;
    const scope = "openid wow.profile";

    return res.redirect(
      `https://oauth.battle.net/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
    );
  }

  // Exchange the code for an access token
  const tokenResponse = await fetch('https://oauth.battle.net/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.BLIZZARD_CLIENT_ID}:${process.env.BLIZZARD_CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.BLIZZARD_REDIRECT_URI,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.access_token) {
    return res.redirect(`/auth/callback?token=${tokenData.access_token}`);
  }

  res.status(500).json({ error: 'Failed to authenticate' });
}
