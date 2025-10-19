import { getRefreshToken, setAuthResult } from "@/lib/login-info.utils";
import { AuthResponse } from "@/lib/model/auth.model";

export async function POST() {
    const refreshToken = await getRefreshToken()

    if(!refreshToken) {
        return Response.json({}, {status: 401})
    }

    const refreshUrl = `${process.env.BASEURL}/auth/refresh`

    const refreshResp = await fetch(refreshUrl, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            token: refreshToken
        })
    })

    if(!refreshResp.ok) {
        return Response.json({}, {status: 401})
    }

    const refreshResult = await refreshResp.json() as AuthResponse
    await setAuthResult(refreshResult)
    
    return Response.json(refreshResult)
}