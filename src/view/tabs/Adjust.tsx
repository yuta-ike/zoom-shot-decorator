import React from 'react'
import c from 'classnames'
import { Rnd } from 'react-rnd'
import {
  getMajorTemplate,
  GuideTemplate,
  isEqualTemplate,
} from '~/zoom/calcTemplateGuide'
import GridGuideFrame from '~/view/components/GridGuideFrame'
import { Pos, Size } from '~/types/figure'

type Props = {
  count: number
  template: GuideTemplate
  onChangeTemplate: (template: GuideTemplate) => void
  previewUrl: string
  previewRef: React.RefObject<HTMLImageElement>
  goNext: () => void
  pos: Pos
  size: Size
  onChangePos: (pos: Pos) => void
  onChangeSize: (size: Size) => void
  className: string
}

const Adjust: React.FC<Props> = ({
  count,
  template,
  onChangeTemplate,
  previewUrl,
  previewRef,
  goNext,
  pos,
  size,
  onChangePos,
  onChangeSize,
  className,
}) => {
  return (
    <div className={className}>
      <div className="flex flex-row flex-nowrap overflow-x-scroll">
        {getMajorTemplate(count).map((_template, i) => {
          const isSelected = isEqualTemplate(_template, template)
          return (
            <button
              key={i}
              onClick={() => onChangeTemplate(_template)}
              className={c(
                'flex flex-col items-center m-4 p-4 transition rounded-md border-2',
                isSelected
                  ? ' border-gray-300'
                  : 'border-transparent hover:bg-gray-100 hover:shadow-lg',
              )}
              aria-pressed={isSelected}
            >
              <p className="transform text-sm">
                {_template.col}段 × {_template.row}列
              </p>
              <div style={{ width: _template.col * 20 }}>
                <GridGuideFrame
                  template={_template}
                  itemClassName="shadow-none bg-blue-400 border border-gray-100"
                />
              </div>
            </button>
          )
        })}
      </div>
      <div className="relative">
        <img
          src={previewUrl}
          alt="プレビュー画像"
          className="w-full opacity-70 pointer-events-none"
          ref={previewRef}
        />
        <Rnd
          position={pos}
          size={size}
          lockAspectRatio
          onDragStop={(_, pos) => onChangePos({ x: pos.x, y: pos.y })}
          onResizeStop={(_, __, ref, ___, pos) => {
            onChangePos({ x: pos.x, y: pos.y })
            onChangeSize({ width: ref.style.width, height: ref.style.height })
          }}
        >
          <GridGuideFrame template={template} />
        </Rnd>
      </div>
      <div className="flex flex-col items-center w-full">
        <button
          className="my-8 pl-4 pr-8 py-2 bg-pink-400 text-white rounded-md relative shadow-sm transition hover:shadow-lg"
          onClick={goNext}
        >
          OK <span className="animate-bounce-right absolute">→</span>
        </button>
      </div>
    </div>
  )
}

export default Adjust
