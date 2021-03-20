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
      </div>
    </div>
  )
}

export default Index
