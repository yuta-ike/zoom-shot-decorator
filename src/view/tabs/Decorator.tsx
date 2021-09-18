import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import c from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'
import { Rnd } from 'react-rnd'
import NumberPicker from '../components/NumberPicker'
import STECKER_LIST from '~/constants/stecker'
import BgImg from '~/types/bgImge'
import Stecker from '~/types/stecker'
import { getMajorTemplate } from '~/zoom/calcTemplateGuide'
import Range from '~/util/Range'
import Frame from '~/types/frame'

type Props = {
  bgImg: BgImg
  bgSize: number
  opacity: number
  frame: Frame | null
  onChangeBgSize: (v: number) => void
  onChangeOpacity: (v: number) => void
  images: string[]
  containedList: boolean[]
  onChangeContainedList: (index: number) => void
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
  frame,
  onChangeBgSize,
  onChangeOpacity,
  images,
  containedList,
  onChangeContainedList,
}) => {
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [selectedSteckers, setSelectedSteckers] = useState<SteckerData[]>([])
  const [minusMargin, setMinusMargin] = useState(0)
  const [showBorder, setShowBorder] = useState(false)
  const [canvasWidth, setCanvasWidth] = useState(100)

  useEffect(() => {
    const w = window.innerWidth - 400
    const h = window.innerHeight - 300
    const isWidthLarge = w * 9 > h * 16
    if (isWidthLarge) {
      setCanvasWidth((h * 16.0) / 9.0)
    } else {
      setCanvasWidth(w)
    }
  }, [])

  const template = getMajorTemplate(containedList.filter(Boolean).length)[0]
  console.log(containedList)

  const [photoUnLock, setPhotoUnLock] = useState(false)
  console.log(photoUnLock)

  console.log(minusMargin)

  return (
    <div className="w-full h-full px-8 py-6">
      <div className="flex flex-col justify-end w-full h-full p-4 shadow-xl bg-gray-50 rounded-3xl">
        <div className="flex items-start justify-end flex-shrink-0 text-black">
          <div>
            <div className="h-full p-8 my-auto mr-8 text-gray-500 bg-gray-100 rounded">
              スタンプや写真を自由に配置してデコレーションしよう!!
              <br />
              完成したらスクリーンショットで保存してね
            </div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0 py-2 pr-8 mr-8 space-y-3 border-r border-gray-400">
            <div className="text-sm text-gray-500">移動方法</div>
            <div className="flex flex-col items-center space-y-1">
              <div
                className={c(
                  'w-full px-4 py-1 rounded',
                  photoUnLock ? 'opacity-20' : 'text-white bg-accent',
                )}
              >
                全員まとめて移動
              </div>
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  photoUnLock && 'text-white bg-accent',
                )}
                onClick={() => setPhotoUnLock(true)}
              >
                人物ごとに移動
              </button>
              <p className="text-xs text-gray-500">
                ※一度「人物ごとに移動」に
                <br />
                変更すると戻せません
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center flex-shrink-0 py-2 mr-8 space-y-3">
            <div className="text-sm text-gray-500">人物間の距離</div>
            <div className="flex flex-col items-center space-y-1">
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  minusMargin === 0 && 'text-white bg-accent',
                )}
                onClick={() => setMinusMargin(0)}
              >
                通常
              </button>
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  minusMargin === 15 && 'text-white bg-accent',
                )}
                onClick={() => setMinusMargin(15)}
              >
                近い
              </button>
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  minusMargin === 30 && 'text-white bg-accent',
                )}
                onClick={() => setMinusMargin(30)}
              >
                とても近い
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center flex-shrink-0 py-2 mr-8 space-y-3">
            <div className="text-sm text-gray-500">人物を囲う枠線</div>
            <div className="flex flex-col items-center space-y-1">
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  showBorder && 'text-white bg-accent',
                )}
                onClick={() => setShowBorder(true)}
              >
                表示する
              </button>
              <button
                className={c(
                  'px-4 py-1 rounded w-full',
                  !showBorder && 'text-white bg-accent',
                )}
                onClick={() => setShowBorder(false)}
              >
                表示しない
              </button>
            </div>
          </div>
          <NumberPicker
            value={Math.round(bgSize * 100)}
            onChange={(v) => onChangeBgSize(v / 100.0)}
            min={30}
            max={130}
            className="relative flex-shrink-0"
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
            className="relative flex-shrink-0"
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
          <div className="flex flex-col items-center px-4 w-72">
            <h1 className="font-bold text-pink-400">STECKERS</h1>
            <div className="grid flex-shrink-0 h-64 grid-cols-2 gap-4 p-4 overflow-y-scroll">
              {STECKER_LIST.map((stecker) => (
                <button
                  key={stecker.src}
                  className="bg-white border-2 border-transparent rounded-lg hover:shadow-md"
                  onClick={() =>
                    setSelectedSteckers((prev) => [
                      ...prev,
                      { x: 0, y: 0, width: 100, height: 100, data: stecker },
                    ])
                  }
                >
                  <img
                    src={stecker.src}
                    alt={stecker.name}
                    className="pointer-events-none"
                  />
                </button>
              ))}
            </div>
            <h1 className="mt-auto mb-4 font-bold text-pink-400">
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
          <div>
            <div
              className="relative overflow-hidden aspect-w-16 aspect-h-9 shadow-custom"
              style={{ backgroundColor: bgColor, width: canvasWidth }}
            >
              {frame != null && (
                <img
                  src={frame.src}
                  alt="背景画像"
                  className="z-20 object-contain w-full m-auto opacity-100 pointer-events-none"
                />
              )}
              <img
                src={bgImg?.src}
                alt="背景画像"
                className="object-contain w-full m-auto pointer-events-none"
                style={{
                  transform: `scale(${bgSize})`,
                  opacity: opacity,
                }}
              />
              {/* <div className="flex flex-col items-center justify-center"> */}
              <Rnd
                className={
                  !photoUnLock
                    ? 'border border-transparent hover:bg-gray-100 hover:bg-opacity-30 hover:border-red-600'
                    : ''
                }
                // enableResizing={false}
                disableDragging={photoUnLock}
                enableUserSelectHack={!photoUnLock}
                lockAspectRatio
              >
                <div
                  // className={`mx-auto grid gap-1 grid-cols-${
                  //   template.col * 2
                  // } grid-rows-${template.row * 2}`}
                  className="flex flex-wrap justify-center mx-auto"
                  style={{
                    transform:
                      frame?.name === 'コルクボード' ? 'rotate(-5deg)' : '',
                  }}
                >
                  {Range(template.row).map((row) =>
                    Range(template.col).map((col) => {
                      const index = row * template.col + col
                      if (!containedList[index]) return
                      if (template.count <= index) {
                        return
                      }
                      const width = canvasWidth / template.row
                      const height = (width * 9.0) / 16.0
                      return (
                        <div
                          className="relative"
                          key={index}
                          style={{
                            width: width * 0.8,
                            height: height * 0.8,
                            marginLeft: `-${minusMargin}px`,
                          }}
                        >
                          <div
                            className={c(
                              'bg-white bg-opacity-10 rounded-sm border hover:border-gray-400 z-10',
                              photoUnLock ? 'opacity-0' : 'opacity-100',
                              showBorder
                                ? 'border-gray-200'
                                : 'border-transparent',
                              // row === template.row - 1 &&
                              //   col === 0 &&
                              //   `col-start-${1 + template.offset}`,
                            )}
                            style={{
                              top:
                                row * height * 0.9 + (row + 1) * height * 0.1,
                              left:
                                col * width * 0.9 +
                                (col + 1) * width * 0.1 +
                                (row === template.row - 1
                                  ? (template.offset * width) / 2
                                  : 0),
                              width: width * 0.8,
                              height: height * 0.8,
                            }}
                          >
                            <img
                              src={`data:image/png;base64,${images[index]}`}
                              alt="人物画像"
                              className="pointer-events-none"
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </div>
                          {photoUnLock && (
                            <Rnd
                              className={c(
                                'bg-white bg-opacity-10 rounded-sm border border-transparent hover:border-gray-400 opacity-100 z-10',
                                showBorder
                                  ? 'border-gray-200'
                                  : 'border-transparent',
                                // row === template.row - 1 &&
                                //   col === 0 &&
                                //   `col-start-${1 + template.offset}`,
                              )}
                              lockAspectRatio
                              // size={{ width: width * 0.8, height: height * 0.8 }}
                              // position={{
                              //   x:
                              //     col * width * 0.9 +
                              //     (col + 1) * width * 0.1 +
                              //     (row === template.row - 1
                              //       ? (template.offset * width) / 2
                              //       : 0),
                              //   y: row * height * 0.9 + (row + 1) * height * 0.1,
                              // }}
                              default={{
                                // y:
                                //   row * height * 0.9 + (row + 1) * height * 0.1,
                                // x:
                                //   col * width * 0.9 +
                                //   (col + 1) * width * 0.1 +
                                //   (row === template.row - 1
                                //     ? (template.offset * width) / 2
                                //     : 0),
                                x: 0,
                                y: 0,
                                width: '100%', //`${width * 8}px`,
                                height: '100%', //`${height * 8}px`,
                              }}
                              // style={{
                              //   top:
                              //     row * height * 0.9 + (row + 1) * height * 0.1,
                              //   left:
                              //     col * width * 0.9 +
                              //     (col + 1) * width * 0.1 +
                              //     (row === template.row - 1
                              //       ? (template.offset * width) / 2
                              //       : 0),
                              //   width: width * 0.8,
                              //   height: height * 0.8,
                              // }}
                            >
                              <img
                                src={`data:image/png;base64,${images[index]}`}
                                alt="人物画像"
                                className="pointer-events-none"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </Rnd>
                          )}
                        </div>
                      )
                    }),
                  )}
                </div>
              </Rnd>
              {/* </div> */}
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
                  className="relative z-50 rounded-md hover:bg-gray-300 hover:bg-opacity-25 group"
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
                className="object-contain w-full"
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
