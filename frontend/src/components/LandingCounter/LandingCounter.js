import React, { useEffect, useState } from 'react'

function LandingCounter({ finalCount }) {
    const [count, setCount] = useState(0)

    useEffect(() => {
        let interval = setInterval(() => {
            setCount(prevCount => prevCount + 1)
        }, 0.5);

        if (count === finalCount) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [count])

    return (
        <span className="landing-status__count">{new Intl.NumberFormat().format(count)}</span>
    )
}

export default LandingCounter