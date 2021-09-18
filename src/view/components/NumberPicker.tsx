import React, { useEffect, useRef } from 'react'
import c from 'classnames'
import throttle from 'lodash.throttle'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  labelRender: (value: number) => React.ReactNode
  className?: string
  ignored?: boolean
}

const NumberPicker: React.FC<Props> = ({
  value,
  min,
  max,
  onChange,
  labelRender,
  className,
  ignored = false,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const rate = (value - min) / (max - min)

  const reflectScrollRate = () => {
    if (ref.current != null) {
      ref.current.scrollTop =
        rate * (ref.current.scrollHeight - ref.current.clientHeight)
    }
  }

  useEffect(() => {
    reflectScrollRate()
  }, [ref.current != null])

  const handleScroll = throttle((_) => {
    if (ref.current != null) {
      const scrollRate =
        ref.current.scrollTop /
        (ref.current.scrollHeight - ref.current.clientHeight)

      const newValue = Math.round((max - min) * scrollRate) + min
      if (value !== newValue) {
        onChange(newValue)
      }
    }
  })

  const handleIncrement = () => {
    if (value === max) return
    onChange(value + 1)
  }

  const handleDecrement = () => {
    if (value === min) return
    onChange(value - 1)
  }

  return (
    <div
      className={c(
        'group flex flex-col items-center',
        className,
        ignored && 'pointer-events-none',
      )}
    >
      <div className="z-10 flex flex-row items-center">
        <button
          className="flex items-center justify-center w-6 h-6 p-1 m-4 text-sm text-white transition bg-red-200 rounded-md hover:bg-red-300"
          onClick={handleDecrement}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div
          className="relative overflow-x-hidden overflow-y-scroll h-36 scrollbar-none group overscroll-none"
          onScroll={handleScroll}
          ref={ref}
        >
          <div className="sticky top-0 flex items-center justify-center bg-red-300 rounded-full font- w-36 h-36 pie">
            <div
              className="absolute top-0 w-full h-full bg-gray-100 rounded-full lef-0"
              style={{
                background:
                  'linear-gradient(transparent, transparent 50%, #E5E7EB 50%, #E5E7EB',
                transform: `rotate(90deg)`,
              }}
            />
            <div
              className="absolute top-0 w-full h-full bg-gray-100 rounded-full lef-0"
              style={{
                background:
                  rate < 0.5
                    ? 'linear-gradient(transparent, transparent 50%, #E5E7EB 50%, #E5E7EB'
                    : 'linear-gradient(#FCA5A5, #FCA5A5  50%, transparent 50%, transparent',
                transform: `rotate(${360 * rate - 90}deg)`,
              }}
            />
            <div className="z-20 flex items-center justify-center w-24 h-24 text-xl transition bg-gray-100 rounded-full group-hover:shadow-lg">
              {labelRender(value)}
            </div>
          </div>
          <div
            className="flex flex-col h-96 from-blue-50 to-blue-500"
            onScroll={handleScroll}
          />
        </div>
        <button
          className="flex items-center justify-center w-6 h-6 p-1 m-4 text-white transition bg-red-200 rounded-md hover:bg-red-300"
          onClick={handleIncrement}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="mt-2 text-xs text-gray-400 transition duration-300 delay-200 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        その場でスクロールしてね
      </p>
    </div>
  )
}

export default NumberPicker
