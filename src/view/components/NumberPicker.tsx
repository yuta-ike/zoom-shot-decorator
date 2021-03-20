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
      console.log(newValue)
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
      <div className="flex flex-row items-center z-10">
        <button
          className="m-4 bg-red-200 text-white w-6 h-6 flex items-center justify-center rounded-md text-sm hover:bg-red-300 transition p-1"
          onClick={handleDecrement}
        >
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <div
          className="h-36 overflow-y-scroll overflow-x-hidden relative scrollbar-none group overscroll-none"
          onScroll={handleScroll}
          ref={ref}
        >
          <div className="font- bg-red-300 sticky top-0 w-36 h-36 flex items-center justify-center rounded-full pie">
            <div
              className="absolute top-0 lef-0 w-full h-full bg-gray-100 rounded-full"
              style={{
                background:
                  'linear-gradient(transparent, transparent 50%, #E5E7EB 50%, #E5E7EB',
                transform: `rotate(90deg)`,
              }}
            />
            <div
              className="absolute top-0 lef-0 w-full h-full bg-gray-100 rounded-full"
              style={{
                background:
                  rate < 0.5
                    ? 'linear-gradient(transparent, transparent 50%, #E5E7EB 50%, #E5E7EB'
                    : 'linear-gradient(#FCA5A5, #FCA5A5  50%, transparent 50%, transparent',
                transform: `rotate(${360 * rate - 90}deg)`,
              }}
            />
            <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center z-20 text-xl transition group-hover:shadow-lg">
              {labelRender(value)}
            </div>
          </div>
          <div
            className="flex flex-col h-96 from-blue-50 to-blue-500"
            onScroll={handleScroll}
          />
        </div>
        <button
          className="m-4 bg-red-200 text-white w-6 h-6 flex items-center justify-center rounded-md hover:bg-red-300 transition p-1"
          onClick={handleIncrement}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <p className="text-xs mt-2 text-gray-400 transition delay-200 duration-300 transform -translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
        グラフ上でスクロールしてね
      </p>
    </div>
  )
}

export default NumberPicker
