import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.SECRET_KEY;

export async function POST(req: Request) {
  if (!secretKey) {
    return NextResponse.json(
      { error: "Secret key tidak ditemukan" },
      { status: 500 }
    );
  }

  //   return NextResponse.json(secretKey);

  try {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    console.log(req.headers);

    if (!token)
      return NextResponse.json(
        { error: "Token tidak diberikan" },
        { status: 400 }
      );

    const decoded = jwt.verify(token, secretKey);
    return NextResponse.json({ valid: true, user: decoded });
  } catch (error) {
    return NextResponse.json(
      { valid: false, error: "Token tidak valid" },
      { status: 401 }
    );
  }
}
