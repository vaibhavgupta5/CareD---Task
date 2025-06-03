import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {


    const body = await req.json();
    const {  password } = body;
    let email = body.email.toString();

    email = email.toLowerCase();
try {

    console.log(email, password)
    
    
        if(email !== "test@test.com" || password !== "password123") {
            return NextResponse.json({
                status: 404,
                body:{
                    message: "Invalid email or password"
                }
            })
        }
    
      return NextResponse.json({
        status: 200,
        body: {
          message: "Login successful"
        }
      })
} catch (error: unknown) {
       return NextResponse.json({
        status: 500,
        body: {
          message: error
        }
      })
}
}
