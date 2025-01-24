import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add your middleware logic here
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Add your route matchers here
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
