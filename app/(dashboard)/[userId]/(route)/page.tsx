"use client"

import { useRouter, useParams } from "next/navigation"

export default function Dashboard() {
    const router = useRouter()
    const { userId } = useParams()
    router.push(`/${userId}/Orders`)
}
