import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const profileResponse = await fetch(
    "https://us.api.blizzard.com/profile/user/wow",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Battlenet-Namespace": "profile-us",
      },
    }
  );

  if (profileResponse.ok) {
    const profileData = await profileResponse.json();
    return NextResponse.json(profileData);
  }

  return NextResponse.json(
    { error: "Failed to fetch character data" },
    { status: 500 }
  );
}
