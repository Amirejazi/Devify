import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import axios from 'axios';
import {redirect} from "next/navigation";
export const dynamic = "force-dynamic";

const baseURL = 'http://localhost:8080/api-v1/';


export async function GET(request) {
    redirect('/login')
}
export async function POST(request) {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get('refresh_token');

    if (!refreshToken) {
        return NextResponse.json({error: 'No refresh token found'}, {status: 401});
    }

    try {
        const res = await axios.post(`${baseURL}auth/refresh`, null, {
            headers: {
                Cookie: `refresh_token=${refreshToken.value}`,
            },
        });

        if (res.status === 200) {
            const setCookieHeader = res.headers['set-cookie'];
            let newAccessToken = null;

            if (setCookieHeader) {
                const accessTokenCookie = setCookieHeader.find(cookie => cookie.startsWith('access_token='));

                if (accessTokenCookie) {
                    newAccessToken = accessTokenCookie.split(';')[0].split('=')[1];
                }
            }

            if (newAccessToken) {
                const response = NextResponse.json({success: true});
                response.cookies.set('access_token', newAccessToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Lax',
                    path: '/',
                    maxAge: 60 * 4
                });
                return response;
            } else {
                return NextResponse.json({error: 'Failed to get new tokens'}, {status: 500});
            }
        } else {
            redirect('/login')
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
        redirect('/login')
    }
}