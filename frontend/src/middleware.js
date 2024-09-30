import { NextResponse } from 'next/server';
import axios from "axios";

export async function middleware(req) {
    const headers = new Headers(req.headers);
    headers.set("x-current-path", req.nextUrl.pathname);
    const next =  NextResponse.next({ headers });

    const staticFileRegex = /\.(?:js|css|jpg|jpeg|gif|png|svg|ico|webp|woff|woff2|ttf|otf|mp4|webm|mp3|wav|m4a|aac|oga|json|jfif|map)$/;

    // اگر مسیر شامل یک فایل استاتیک باشد، از middleware رد می‌شود
    if (staticFileRegex.test(req.nextUrl.pathname)) {
        return next
    }

    const accessToken = req.cookies.get('access_token');
    const refreshToken = req.cookies.get('refresh_token');

    console.log('path:', req.nextUrl.pathname)

    if (!accessToken && refreshToken) {
        try {
            const refreshResponse = await axios.post(`http://localhost:8080/api-v1/auth/refresh`,null, {
                    headers: {
                        Cookie: `refresh_token=${refreshToken.value}`,
                    },
                }
            );

            if (refreshResponse.status === 200) {
                const setCookieHeader = refreshResponse.headers['set-cookie'];
                let newAccessToken = null;
                if (setCookieHeader) {
                    newAccessToken = setCookieHeader.split(';')[0].split('=')[1];
                }

                if (newAccessToken) {
                    next.cookies.set('access_token', newAccessToken, {
                        httpOnly: true,
                        secure: false,
                        path: '/',
                        maxAge: 60 * 4
                    });

                    return next;
                }
            }
            else {
                console.error('error from backend for refresh:', refreshResponse.data.detail);
            }
        } catch (error) {
            console.error('Error in token refresh middleware:', error);
            next.cookies.delete('refresh_token');
            return next;
        }
    }
    return next;
}

export const config = {
    matcher: ['/:path*'],
};