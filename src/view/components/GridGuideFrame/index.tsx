import React from 'react'
import c from 'classnames'
import Range from '~/util/Range'
import { GuideTemplate } from '~/zoom/calcTemplateGuide'

type Props = {
  template: GuideTemplate
  itemClassName?: string
}

const GridGuideFrame: React.FC<Props> = ({ template, itemClassName }) => {
  return (
    <div
      className={`grid grid-cols-${template.col * 2} grid-rows-${
        template.row * 2
      } gap-0 justify-center bg-opacity-70`}
    >
      {Range(template.count - template.bottom).map((i) => (
        <div
          key={i}
          className={c(
            'row-span-2 col-span-2 aspect-w-16 aspect-h-9',
            itemClassName ??
              'border-gray-700 bg-red-300 bg-opacity-60 shadow-lg',
          )}
          style={itemClassName == null ? { borderWidth: '0.1px' } : undefined}
        />
      ))}
      <div
        className={c(
          `col-start-${
            1 + template.offset
          } row-span-2 col-span-2 aspect-w-16 aspect-h-9`,
          itemClassName ?? 'border-gray-700 bg-red-300 bg-opacity-60 shadow-lg',
        )}
        style={itemClassName == null ? { borderWidth: '0.1px' } : undefined}
      />
      {Range(template.bottom - 1).map((i) => (
        <div
          key={i}
          className={c(
            'row-span-2 col-span-2 aspect-w-16 aspect-h-9',
            itemClassName ??
              'border-gray-700 bg-red-300 bg-opacity-60 shadow-lg',
          )}
          style={itemClassName == null ? { borderWidth: '0.1px' } : undefined}
        />
      ))}
    </div>
  )
}

export default GridGuideFrame
