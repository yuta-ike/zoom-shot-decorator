import React, { useState } from 'react'
// import { Rnd } from 'react-rnd'
// import { Pos, Size } from '~/types/figure'
// import GridGuideFrame from '~/view/components/GridGuideFrame'

const Index: React.FC = () => {
  // const [pos, setPos] = useState<Pos>({ x: 0, y: 0 })
  // const [size, setSize] = useState<Size>({ width: 160, height: 90 })

  return (
    <div className="text-red-400 p-4">
      ホーム
      <div>{/* POS : ({pos.x}, {pos.y}) */}</div>
      <div>{/* SIZE: ({size.width}, {size.height}) */}</div>
      <div className="relative">
        <img src="/example/zoom.jpg" alt="テスト画像" />
        {/* <Rnd
          position={pos}
          size={size}
          onDragStop={(_, pos) => setPos(pos)}
          onResizeStop={(_, __, ref, ___, pos) => {
            setPos(pos)
            setSize(ref.style)
          }}
          lockAspectRatio
        >
          <GridGuideFrame count={9} />
        </Rnd> */}
        <div className="grid-cols-1" />
        <div className="grid-cols-2" />
        <div className="grid-cols-3" />
        <div className="grid-cols-4" />
        <div className="grid-cols-5" />
        <div className="grid-cols-6" />
        <div className="grid-cols-7" />
        <div className="grid-cols-8" />
        <div className="grid-cols-9" />
        <div className="grid-cols-10" />
        <div className="grid-cols-11" />
        <div className="grid-cols-12" />
        <div className="grid-cols-13" />
        <div className="grid-cols-14" />
        <div className="grid-rows-1" />
        <div className="grid-rows-2" />
        <div className="grid-rows-3" />
        <div className="grid-rows-4" />
        <div className="grid-rows-5" />
        <div className="grid-rows-6" />
        <div className="grid-rows-7" />
        <div className="grid-rows-8" />
        <div className="grid-rows-9" />
        <div className="grid-rows-10" />
        <div className="grid-rows-11" />
        <div className="grid-rows-12" />
        <div className="grid-rows-13" />
        <div className="grid-rows-14" />
        <div className="col-start-1" />
        <div className="col-start-2" />
        <div className="col-start-3" />
        <div className="col-start-4" />
        <div className="col-start-5" />
        <div className="col-start-6" />
        <div className="col-start-7" />
        <div className="col-start-8" />
        <div className="col-start-9" />
        <div className="col-start-10" />
        <div className="col-start-11" />
        <div className="col-start-12" />
        <div className="col-start-13" />
        <div className="col-start-14" />
      </div>
    </div>
  )
}

export default Index
