"use server"

import { getRefreshToken, setAuthResult } from "@/lib/login-infos";
import { AuthResponse } from "@/lib/model/auth.model";
import { POST_INIT } from "@/lib/utils";

export async function POST(req: Request) {

    const { token } = await req.json()
    
    if(!token) {
        return Response.json({}, {status: 401})
    }

    const refreshResp = await fetch(`${process.env.APIURL}/auth/refresh`, {
        ...POST_INIT,
        body: JSON.stringify({
            token: token
        })
    })

    if(!refreshResp.ok) {
        return Response.json({}, {status: 401})
    }

    const refreshResult = await refreshResp.json() as AuthResponse
    await setAuthResult(refreshResult)
    
    return Response.json(refreshResult)
}