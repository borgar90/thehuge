import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;
  const redirectUri = process.env.BLIZZARD_REDIRECT_URI!;

  if (!code) {
    // Redirect to Blizzard's OAuth
    const scope = "openid wow.profile";
    return NextResponse.redirect(
      `https://oauth.battle.net/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
    );
  }

  // Exchange the code for an access token
  const tokenResponse = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${clientId}:${clientSecret}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.access_token) {
    return NextResponse.redirect(
      `/auth/callback?token=${tokenData.access_token}`
    );
  }

  return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
}
