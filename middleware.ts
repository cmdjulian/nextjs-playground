import type {NextRequest} from 'next/server'
import {NextResponse} from 'next/server'
import {useEffect} from "react";

const token = () => useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem('token')
}, [])


export function middleware(request: NextRequest) {
    useEffect(() => {
        // Perform localStorage action
        const token = localStorage.getItem('token')
        console.log(`called middleware, token value: ${token}`)

        if (!(token === undefined || token === null)) {
            return NextResponse.rewrite(new URL('/login'))
        }
    }, [])
}
