import React, { useEffect, useState } from 'react'

type TimerProps = {
  children: (time: number) => React.ReactElement
}

const Timer: React.VFC<TimerProps> = ({ children }) => {
  const [time, setTime] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return children(time)
}

export default Timer
