import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { ChromePicker } from 'react-color'
import { Rnd } from 'react-rnd'
import NumberPicker from '../components/NumberPicker'
import STECKER_LIST from '~/constants/stecker'
import BgImg from '~/types/bgImge'
import { Pos } from '~/types/figure'
import Stecker from '~/types/stecker'

type Props = {
  bgImg: BgImg
  bgSize: number
  opacity: number
  onChangeBgSize: (v: number) => void
  onChangeOpacity: (v: number) => void
}

type SteckerData = {
  x: number
  y: number
  width: number
  height: number
  data: Stecker
}

const Decorator: React.FC<Props> = ({
  bgImg,
  bgSize,
  opacity,
  onChangeBgSize,
  onChangeOpacity,
}) => {
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [selectedSteckers, setSelectedSteckers] = useState<SteckerData[]>([])
  return (
    <div className="w-full h-full px-8 py-6">
      <div className="bg-gray-50 rounded-3xl shadow-xl w-full h-full p-4 flex flex-col justify-end">
        <div className="h-36 flex-shrink-0 text-black flex items-end justify-end">
          <NumberPicker
            value={Math.round(bgSize * 100)}
            onChange={(v) => onChangeBgSize(v / 100.0)}
            min={30}
            max={130}
            className="relative"
            labelRender={(value) => (
              <div className="flex flex-col text-center">
                <p className="text-sm text-gray-500">拡大率</p>
                <p className="text-center">
                  <span className="text-sm">×</span>
                  {value / 100.0}
                </p>
              </div>
            )}
          />
          <NumberPicker
            value={Math.round(opacity * 100)}
            onChange={(v) => onChangeOpacity(v / 100.0)}
            className="relative"
            min={0}
            max={100}
            labelRender={(value) => (
              <div className="flex flex-col text-center">
                <p className="text-sm text-gray-500">透明度</p>
                <p className="text-center">
                  <span className="text-sm">×</span>
                  {value / 100.0}
                </p>
              </div>
            )}
          />
        </div>
        <div className="flex">
          <div className="w-72 px-4 flex flex-col items-center">
            <h1 className="text-pink-400 font-bold">STECKERS</h1>
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 p-4 overflow-y-scroll">
              {STECKER_LIST.map((stecker) => (
                <button
                  key={stecker.src}
                  className="bg-white rounded-lg border-2 border-transparent hover:shadow-md"
                  onClick={() =>
                    setSelectedSteckers((prev) => [
                      ...prev,
                      { x: 0, y: 0, width: 100, height: 100, data: stecker },
                    ])
                  }
                >
                  <img src={stecker.src} alt={stecker.name} />
                </button>
              ))}
            </div>
            <h1 className="text-pink-400 font-bold mt-auto mb-4">
              BACKGROUND COLOR
            </h1>
            <ChromePicker
              color={bgColor}
              onChangeComplete={(c) =>
                setBgColor(
                  `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${
                    c.rgb.a ?? '255'
                  })`,
                )
              }
            />
          </div>
          {/* {bgImg?.type === 'upload' ? ( */}
          <div>
            <div
              className="aspect-w-16 aspect-h-9 shadow-custom relative overflow-hidden"
              style={(() => {
                const w = window.innerWidth - 400
                const h = window.innerHeight - 300
                const isWidthLarge = w * 9 > h * 16
                if (isWidthLarge) {
                  return {
                    width: `${(h * 16.0) / 9.0}px`,
                    background: bgColor,
                  }
                } else {
                  return {
                    width: `${w}px`,
                    background: bgColor,
                  }
                }
              })()}
            >
              <img
                src={bgImg?.src}
                alt="背景画像"
                className="w-full object-contain pointer-events-none m-auto"
                style={{
                  transform: `scale(${bgSize})`,
                  opacity: opacity,
                }}
              />
              {selectedSteckers.map((stecker, i) => (
                <Rnd
                  key={i}
                  position={{ x: stecker.x, y: stecker.y }}
                  size={{ width: stecker.width, height: stecker.height }}
                  onDragStop={(_, pos) => {
                    setSelectedSteckers((prev) => {
                      prev[i] = { ...prev[i], x: pos.x, y: pos.y }
                      return [...prev]
                    })
                  }}
                  onResizeStop={(_, __, ref, ___, pos) => {
                    setSelectedSteckers((prev) => {
                      prev[i] = {
                        ...prev[i],
                        x: pos.x,
                        y: pos.y,
                        width: parseInt(ref.style.width),
                        height: parseInt(ref.style.height),
                      }
                      return [...prev]
                    })
                  }}
                  lockAspectRatio
                  className="hover:bg-gray-300 hover:bg-opacity-25 relative group rounded-md"
                >
                  <button
                    className="absolute top-0 right-0 w-6 h-6 text-red-400 opacity-0 group-hover:opacity-100"
                    onClick={() => {
                      setSelectedSteckers((prev) => {
                        return [...prev.filter((_, index) => index !== i)]
                      })
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      title="消す"
                      className="bg-white rounded-full"
                    />
                  </button>
                  <img
                    src={stecker.data.src}
                    alt={stecker.data.name}
                    className="pointer-events-none"
                  />
                </Rnd>
              ))}
            </div>
          </div>
          {/* ) : (
            <div className="flex flex-col items-center justify-end w-full shadow-custom">
              <img
                src={bgImg?.src}
                alt="背景画像"
                className="w-full object-contain"
                style={{
                  background: bgColor,
                }}
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default Decorator
