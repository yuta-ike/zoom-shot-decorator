import React, { useMemo, useRef, useState } from 'react'
import c from 'classnames'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faPlus,
  faRedo,
} from '@fortawesome/free-solid-svg-icons'
import throttle from 'lodash.throttle'
import NumberPicker from '../components/NumberPicker'
import BG_LIST from '~/constants/bg'
import BgImg from '~/types/bgImge'

type Props = {
  bgImg: BgImg | null
  onChangeBgImg: (bgImg: BgImg) => void
  goNext: () => void
  size: number
  onChangeSize: (v: number) => void
  opacity: number
  onChangeOpacity: (v: number) => void
}

const Background: React.FC<Props> = ({
  bgImg: selectedBgImg,
  onChangeBgImg,
  goNext,
  size,
  onChangeSize,
  opacity,
  onChangeOpacity,
}) => {
  const [userScroll, setUserScroll] = useState(false)
  const [userUploadBgImg, setUserUploadBgImg] = useState<BgImg | null>(null)
  // const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    // setUserUploadFile(file)
    if (file != null) {
      const url = window.URL.createObjectURL(file)
      // setPreviewUrl(url)
      const newBgImg: BgImg = {
        src: url,
        name: 'ユーザーアップロード',
        type: 'upload',
      }
      onChangeBgImg(newBgImg)
      setUserUploadBgImg(newBgImg)
    }
  }

  // const previewUrl = useMemo(() => {
  //   if (userUploadFile != null) {
  //     return window.URL.createObjectURL(userUploadFile)
  //   }
  // }, [userUploadFile])

  const ref = useRef<HTMLDivElement>(null)

  const handleScroll = throttle((_) => {
    if (ref.current != null) {
      const scrollRate =
        ref.current.scrollTop /
        (ref.current.scrollHeight - ref.current.clientHeight)
      const normalizedScrollRate =
        0.3 + (0.7 * Math.round((1 - scrollRate) * 10)) / 10
      onChangeSize(normalizedScrollRate)
    }
  })

  console.log({ width: `${320 * size}x`, height: `${180 * size}px` })
  console.log(size)

  return (
    <div className="flex flex-col w-full items-start justify-start">
      <div className="px-16">
        <div className="flex items-center mb-4">
          <h1>自分でアップロードした画像</h1>
          <label className="ml-4 my-4 focus-within:outline-black cursor-pointer relative flex">
            <input
              type="file"
              className="w-1 h-1 opacity-0 absolute"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={selectedBgImg?.type !== 'upload'}
            />
            <p
              className={c(
                'flex items-center text-blue-400 text-sm underline transition delay-300 duration-300',
                selectedBgImg?.type !== 'upload' && 'opacity-0',
              )}
            >
              <FontAwesomeIcon icon={faRedo} className="w-3 h-3 mr-2" />
              別の画像をアップロード
            </p>
          </label>
        </div>
        {userUploadBgImg == null ? (
          <label className="rounded-md text-white shadow-sm hover:shadow-md transition cursor-pointer focus-within:outline-black flex">
            <input
              type="file"
              className="w-1 h-1 opacity-0 absolute"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <div
              className="bg-gray-200 text-gray-400 rounded-md border-2 border-gray-400 flex flex-col items-center justify-center transition"
              style={{ width: '240px', height: '135px' }}
            >
              <FontAwesomeIcon icon={faPlus} className="w-8 h-8 mt-4 mb-2" />
              <p>アップロード</p>
            </div>
          </label>
        ) : (
          <div className="flex">
            <div
              className="overflow-y-scroll h-44 scrollbar-none overflow-hidden"
              onScroll={handleScroll}
              ref={ref}
            >
              <div className="relative h-96">
                <button
                  className={c(
                    'flex flex-col items-center justify-center border-2 rounded-lg mx-2 transition sticky top-0 p-4',
                    selectedBgImg?.type === 'upload'
                      ? 'border-gray-400'
                      : 'border-transparent',
                  )}
                  onClick={() => onChangeBgImg(userUploadBgImg)}
                >
                  <div
                    className={c(
                      'bg-white rounded-lg flex items-center justify-center',
                      selectedBgImg?.type !== 'upload' && 'hover:shadow-xl',
                    )}
                    style={{
                      width: '240px',
                      height: '135px',
                    }}
                  >
                    <img
                      src={userUploadBgImg.src}
                      alt="ユーザーアップロード背景"
                      className="object-contain m-4"
                      style={{
                        width: `${240 * size}px`,
                        height: `${135 * size}px`,
                        opacity: opacity,
                      }}
                    />
                  </div>
                </button>
              </div>
            </div>
            <NumberPicker
              value={Math.round(size * 100)}
              onChange={(v) => onChangeSize(v / 100.0)}
              min={30}
              max={130}
              className={c(
                selectedBgImg?.type !== 'upload'
                  ? 'opacity-0 -translate-x-8'
                  : 'opacity-100 translate-x-0',
                'transition transform relative delay-200',
              )}
              labelRender={(value) => (
                <div className="flex flex-col text-center">
                  <p className="text-sm text-gray-500">拡大率</p>
                  <p className="text-center">
                    <span className="text-sm">×</span>
                    {value / 100.0}
                  </p>
                </div>
              )}
              ignored={selectedBgImg?.type !== 'upload'}
            />
            <NumberPicker
              value={Math.round(opacity * 100)}
              onChange={(v) => onChangeOpacity(v / 100.0)}
              className={c(
                selectedBgImg?.type !== 'upload'
                  ? 'opacity-0 -translate-x-8'
                  : 'opacity-100 translate-x-0',
                'transition transform relative delay-300',
              )}
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
              ignored={selectedBgImg?.type !== 'upload'}
            />
          </div>
        )}
      </div>
      <hr className="h-0.5 w-11/12 bg-gray-200 rounded-full mx-auto my-6" />
      <div className="w-full relative">
        <h1 className="px-16">テンプレート背景から選択する</h1>
        <div
          className="flex flex-nowrap overflow-x-scroll w-full"
          onScroll={() => setUserScroll(true)}
        >
          <div
            className={c(
              'absolute top-1/2 right-8 transform -translate-y-1/2 z-10 transition delay-300 duration-300',
              userScroll ? 'translate-x-32' : '',
            )}
          >
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              className="text-gray-700 animate-bounce-right rounded-full p-2 w-12 h-12"
            />
          </div>
          <div className="px-8" />
          {BG_LIST.map((bgImg) => {
            const isSelected = bgImg.src === selectedBgImg?.src
            return (
              <div
                key={bgImg.src}
                className={c(
                  'flex flex-col items-center justify-center p-4 border-2 rounded-lg mx-2 mt-4 mb-12 transition relative',
                  isSelected ? 'border-gray-400' : 'border-transparent',
                )}
              >
                <button
                  className={c(
                    'transition rounded-lg overflow-hidden',
                    !isSelected && 'hover:shadow-xl',
                  )}
                  style={{
                    width: '240px',
                    height: '135px',
                  }}
                  onClick={() => onChangeBgImg(bgImg)}
                  aria-pressed={isSelected}
                >
                  <Image
                    key={bgImg.src}
                    src={bgImg.src}
                    alt={'背景画像 ' + bgImg.name}
                    width="320px"
                    height="180px"
                    objectFit="cover"
                    objectPosition="left"
                    className="h-full"
                  />
                </button>
                <p
                  className={c(
                    'text-center absolute top-full mt-4 transition transform',
                    isSelected
                      ? 'translate-y-0 opacity-100'
                      : '-translate-y-8 opacity-0',
                  )}
                >
                  {bgImg.name}
                </p>
              </div>
            )
          })}
          <div className="px-8" />
        </div>
      </div>
      {/* <div className="se"> */}
      <button
        className="self-center mt-8 pl-4 pr-8 py-2 bg-pink-400 text-white rounded-md relative shadow-sm transition hover:shadow-lg disabled:bg-gray-400"
        onClick={goNext}
        disabled={selectedBgImg == null}
      >
        OK
        <span className="animate-bounce-right absolute inline-block">→</span>
      </button>
      {/* </div> */}
    </div>
  )
}

export default Background
