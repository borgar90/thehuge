import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code provided" }, { status: 400 });
  }

  const clientId = process.env.BLIZZARD_CLIENT_ID!;
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET!;
  const redirectUri = process.env.BLIZZARD_REDIRECT_URI!;

  // Exchange authorization code for access token
  const tokenResponse = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
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
    // Fetch user character data
    const characterResponse = await fetch("https://us.api.blizzard.com/profile/user/wow", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        "Battlenet-Namespace": "profile-us",
      },
    });

    if (characterResponse.ok) {
      const characterData = await characterResponse.json();
      return NextResponse.json({ success: true, characterData });
    }
  }

  return NextResponse.json({ error: "Failed to authenticate with Blizzard" }, { status: 500 });
}
