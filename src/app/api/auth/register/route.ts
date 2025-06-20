import { connectToDb } from "@/libs/db";
import User from "@/models/User";


import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDb();

    const exsitingUser = await User.findOne({ email });

    if (exsitingUser) {
      return NextResponse.json(
        { error: "User alredy registerd" },
        { status: 400 }
      );
    }
    await User.create({
      email,
      password,
    });
    return NextResponse.json(
      { message: "Registraion sucessfully" },
      { status: 201 }
    );
  } catch (error) {
     console.log("registration error", error);
     
    return NextResponse.json(
      { error: "Failed to register the user" },
      { status: 400 }
    );
  }
}
