"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
export default function MainNav(
    { className, ...props }
    :React.HTMLAttributes<HTMLElement>
    ) {
    const pathname = usePathname()
    const params = useParams()
    // console.log("params", params);
    
    // Categories
    const routes = [{
        name: 'Orders',
        path: `/${params.userId}/Orders`,
        active: pathname === `/${params.userId}/Orders`
    },
    {
        name: 'Billboard',
        path: `/${params.userId}/Billboards`,
        active: pathname === `/${params.userId}/Billboards`
    },
    {
        name: 'Category',
        path: `/${params.userId}/Categories`,
        active: pathname === `/${params.userId}/Categories`
    },
    {
        name: 'Product',
        path: `/${params.userId}/Products`,
        active: pathname === `/${params.userId}/Products`
    },
    {
        name: 'Color',
        path: `/${params.userId}/Colors`,
        active: pathname === `/${params.userId}/Colors`
    },
    {
        name: 'Scent',
        path: `/${params.userId}/Scents`,
        active: pathname === `/${params.userId}/Scents`
    },
]

    return (
        <nav className={cn(className)}>
            {routes.map((route) => (
                <Link
                    key={route.name}
                    href={route.path}
                    className={cn(
                        'text-lg font-semibold cursor-pointer pr-8',
                        route.active ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                    )}
                >
                    {route.name}
                </Link>
            ))}
        </nav>
    )
}