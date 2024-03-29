import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Pos, Size } from '~/types/figure'
import Range from '~/util/Range'
import { getMajorTemplate, GuideTemplate } from '~/zoom/calcTemplateGuide'
import Intro from '~/view/tabs/Intro'
import Upload from '~/view/tabs/Upload'
import MemberCount from '~/view/tabs/MemberCount'
import Adjust from '~/view/tabs/Adjust'
import Confirm from '~/view/tabs/Confirm'
import Background from '~/view/tabs/Background'
import BgImg from '~/types/bgImge'
import Decorator from '~/view/tabs/Decorator'
import postShotData from '~/repository'
import Frame from '~/types/frame'
import Timer from '~/view/components/Timer'

type PageType =
  | 'intro'
  | 'upload'
  | 'count'
  | 'adjust'
  | 'confirm'
  | 'bg'
  | 'loading'
  | 'decorate'
const PATH: PageType[] = [
  'intro',
  'upload',
  'count',
  'adjust',
  'confirm',
  'bg',
  'loading',
  'decorate',
]

const Version1 = () => {
  const router = useRouter()
  const currentPageType: PageType =
    PATH.find((path) => router.query.mode === path) ?? PATH[0]

  const goNext = () => {
    const currentIndex = PATH.findIndex((path) => router.query.mode === path)
    router.push(
      `/v1?mode=${PATH[currentIndex < 0 ? 1 : currentIndex + 1]}`,
      undefined,
      {
        shallow: true,
      },
    )
  }

  const [file, setFile] = useState<File | null>(null)

  const previewUrl = useMemo(() => {
    if (file != null) return window.URL.createObjectURL(file)
    return null
  }, [file])

  const previewRef = useRef<HTMLImageElement>(null)

  const [count, setCount] = useState<number>(8)
  const [pos, setPos] = useState<Pos>({ x: 0, y: 0 })
  const [template, setTemplate] = useState<GuideTemplate>(
    getMajorTemplate(count)[0],
  )
  const [size, setSize] = useState<Size>({
    // TODO: 正しい値を設定
    width: 160, // * _template.col,
    height: 90, // * _template.row,
  })
  useEffect(() => {
    setSize({ width: 160 * template.col, height: 90 * template.row })
  }, [template])

  const [imgSize, setImgSize] = useState<{
    width: number
    height: number
  } | null>()

  const [images, setImages] = useState<string[]>([])

  const handleTrimOk = () => {
    if (previewUrl == null) throw new Error()

    const imgWidth = previewRef.current?.clientWidth ?? 1
    const imgHeight = previewRef.current?.clientHeight ?? 1
    setImgSize({ width: imgWidth, height: imgHeight })

    const rectWidth = parseInt(size.width.toString()) / template.col
    const rectHeight = parseInt(size.height.toString()) / template.row

    const img = new Image()
    img.src = previewUrl
    img.onload = async () => {
      const rects: [number, number, number, number][] = []
      const wRate = img.width / imgWidth
      const hRate = img.height / imgHeight
      Range(template.row).forEach((row) =>
        Range(template.col).forEach((col) => {
          const index = col + template.col * row
          if (index >= containedList.length) {
            return
          }
          if (row !== template.row - 1) {
            rects.push([
              (pos.x + col * rectWidth + col * 1) * wRate,
              (pos.y + row * rectHeight + row * 2.5) * hRate,
              rectWidth * wRate,
              rectHeight * hRate,
            ])
          } else {
            rects.push([
              (template.offset * (rectWidth / 2) +
                pos.x +
                col * rectWidth +
                col * 1) *
                wRate,
              (pos.y + row * rectHeight + row * 2.5) * hRate,
              rectWidth * wRate,
              rectHeight * hRate,
            ])
          }
        }),
      )

      if (file != null) {
        const images = await postShotData(file, rects)
        setImages(images)
      }
    }

    goNext()
  }

  const [containedList, setContainerdList] = useState<boolean[]>([])

  useEffect(() => {
    setTemplate(getMajorTemplate(count)[0])
    setContainerdList(Range(count).map(() => true))
  }, [count])

  const [bgImg, setBgImg] = useState<BgImg | null>(null)
  const [frame, setFrame] = useState<Frame | null>(null)
  const [bgSize, setBgSize] = useState(0.8)
  const [opacity, setOpacity] = useState(0.5)

  useEffect(() => {
    if (currentPageType === 'loading' && images.length > 0) {
      goNext()
    }
  }, [images, currentPageType])

  return (
    <article className="flex items-stretch h-screen font-sans text-white bg-blue-400">
      {currentPageType !== 'decorate' ? (
        <>
          <div
            className="flex flex-col items-end justify-center px-16 text-xl leading-loose"
            style={{ width: '480px' }}
          >
            {currentPageType === 'intro' ? (
              <h2>ZOOM-DECOへようこそ！</h2>
            ) : currentPageType === 'upload' ? (
              <div>
                右のボタンから、
                <br />
                デコレーションしたいZOOMの集合写真を選択してください
              </div>
            ) : currentPageType === 'count' ? (
              <div>集合写真に写っている人の人数を入力してください</div>
            ) : currentPageType === 'adjust' ? (
              <div>赤い枠を移動して、集合写真の枠に合わせてください</div>
            ) : currentPageType === 'confirm' ? (
              <div>集合写真に含める人を選んでください</div>
            ) : currentPageType === 'bg' ? (
              <div>
                写真の背景とフレームを選択し、
                <span className="underline">OKをクリック</span>してください
              </div>
            ) : null}
          </div>
          <section className="flex flex-col items-start justify-center flex-1 w-full min-w-0 py-8 my-8 text-black bg-gray-100 shadow-xl rounded-l-3xl">
            {currentPageType === 'intro' ? (
              <Intro goNext={goNext} className="px-32" />
            ) : currentPageType === 'upload' ? (
              <Upload
                className="px-32"
                file={file}
                onChangeFile={setFile}
                goNext={goNext}
              />
            ) : currentPageType === 'count' && previewUrl != null ? (
              <MemberCount
                className="px-32"
                count={count}
                onChangeCount={setCount}
                previewUrl={previewUrl}
                goNext={goNext}
              />
            ) : currentPageType === 'adjust' && previewUrl != null ? (
              <Adjust
                count={count}
                template={template}
                onChangeTemplate={setTemplate}
                previewUrl={previewUrl}
                previewRef={previewRef}
                goNext={handleTrimOk}
                pos={pos}
                size={size}
                onChangePos={setPos}
                onChangeSize={setSize}
                className="px-32"
              />
            ) : currentPageType === 'confirm' &&
              previewUrl != null &&
              imgSize != null ? (
              <Confirm
                template={template}
                containedList={containedList}
                onChangeContainedList={(index) => {
                  const newContainedList = [...containedList]
                  newContainedList[index] = !newContainedList[index]
                  setContainerdList(newContainedList)
                }}
                previewUrl={previewUrl}
                pos={pos}
                size={size}
                imgSize={imgSize}
                goNext={goNext}
                className="w-full h-full px-32"
              />
            ) : currentPageType === 'bg' ? (
              <Background
                bgImg={bgImg}
                onChangeBgImg={setBgImg}
                goNext={goNext}
                size={bgSize}
                onChangeSize={setBgSize}
                opacity={opacity}
                onChangeOpacity={setOpacity}
                frame={frame}
                onChangeFrame={setFrame}
              />
            ) : currentPageType === 'loading' ? (
              <div className="flex flex-col items-center justify-center w-full pb-12">
                <div className="flex">
                  {'loading'.split('').map((str, i) => (
                    <div
                      key={i}
                      className="mx-2 text-lg animate-bounce"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      {str}
                    </div>
                  ))}
                </div>
                <p className="mt-4">画像を処理しています。</p>
                <p className="mt-8 text-sm text-gray-500">
                  1分経っても画面が遷移しない場合は
                  <button
                    className="inline text-blue-600 underline"
                    onClick={goNext}
                  >
                    こちら
                  </button>
                  をクリックしてください
                </p>
                <p className="mt-2">
                  <Timer>
                    {(time) => (
                      <p className="text-sm text-gray-500">{time}秒</p>
                    )}
                  </Timer>
                </p>
              </div>
            ) : (
              <div className="m-16">
                エラーが発生しました
                <br />
                <Link href="/v1">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="text-blue-500 underline">ホームへ戻る</a>
                </Link>
              </div>
            )}
          </section>
        </>
      ) : bgImg != null ? (
        <Decorator
          bgImg={bgImg}
          bgSize={bgSize}
          opacity={opacity}
          frame={frame}
          onChangeBgSize={setBgSize}
          onChangeOpacity={setOpacity}
          images={images}
          containedList={containedList}
          onChangeContainedList={(index: number) => {
            const newContainedList = [...containedList]
            newContainedList[index] = !newContainedList[index]
            setContainerdList(newContainedList)
          }}
        />
      ) : (
        // <div className="w-full h-full px-8 py-6">
        //   <div className="flex w-full h-full p-4 bg-white shadow-xl rounded-3xl">
        //     <div className="flex-shrink-0 w-96">AAA</div>
        //     {bgImg?.type === 'upload' ? (
        //       <div className="flex flex-col items-center justify-center w-full">
        //         <img
        //           src={bgImg?.src}
        //           alt="背景画像"
        //           className="object-contain w-full border border-gray-500"
        //           style={{
        //             transform: `scale(${bgImg})`,
        //             opacity: opacity,
        //           }}
        //         />
        //       </div>
        //     ) : (
        //       <div className="flex flex-col items-center justify-end w-full">
        //         <img
        //           src={bgImg?.src}
        //           alt="背景画像"
        //           className="object-contain w-full border border-gray-500"
        //         />
        //       </div>
        //     )}
        //   </div>
        // </div>
        <div className="m-16">
          エラーが発生しました
          <br />
          <Link href="/v1">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="text-blue-500 undefline">ホームへ戻る</a>
          </Link>
        </div>
      )}
    </article>
  )
}

export default Version1
