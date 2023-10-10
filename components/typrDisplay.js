import React from 'react'

function TyprDisplay({
    text,
    typedLength
}) {
    if (typeof text !== "string") return null;
    const activeText = text.substring(0, typedLength);
    const untyped = text.substring(typedLength);
    return (
        <div className='w-full'>
            <span className='text-white'>{activeText}</span>
            <span className='text-zinc-500'>{untyped}</span>
        </div>
    )
}

export default TyprDisplay