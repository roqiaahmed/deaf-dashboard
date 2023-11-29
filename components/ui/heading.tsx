import React from 'react'
interface HeadingProps {
    title: string,
    description: string,
}

export const Heading: React.FC<HeadingProps> =({title, description}) => {
    return (
        <div className=' ml-12 w-[50%]'>
            <h1 className='font-bold text-3xl tracking-tight'>{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}
