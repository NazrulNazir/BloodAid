'use server'
import { NextResponse } from 'next/server'
// import { auth } from './lib/auth';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';


export default async function proxy(request) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session){

        return NextResponse.next()
    }
    
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/dashboard/admin', '/dashboard/donor', '/dashboard/volunteer', '/funding', '/dashboard/profile', '/alldonationreq/:path+'],
}
