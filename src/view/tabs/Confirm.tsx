import React, { useState } from 'react'
import c from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import Range from '~/util/Range'
import { GuideTemplate } from '~/zoom/calcTemplateGuide'
import { Pos, Size } from '~/types/figure'

type Props = {
  template: GuideTemplate
  containedList: boolean[]
  onChangeContainedList: (index: number) => void
  previewUrl: string
  pos: Pos
  size: Size
  imgSize: { width: number; height: number }
  goNext: () => void
  className: string
}

type Filter = 'none' | 'checked' | 'unchecked'

const Confirm: React.FC<Props> = ({
  template,
  containedList,
  onChangeContainedList,
  previewUrl,
  pos,
  size,
  imgSize,
  goNext,
  className,
}) => {
  const [filter, setFilter] = useState<Filter>('none')
  return (
    <div className={c(className, 'flex flex-col h-full')}>
      <h1 className="my-4 flex-shrink-0">
        集合写真に表示する人を選択してください
      </h1>
      <div
        className="grid w-full gap-2 overflow-y-scroll relative"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        }}
      >
        {Range(template.row).map((row) =>
          Range(template.col).map((col) => {
            const index = col + template.col * row
            if (index >= containedList.length) {
              return
            }
            const isSelected = containedList[index]
            if (
              (filter === 'checked' && !isSelected) ||
              (filter === 'unchecked' && isSelected)
            ) {
              return null
            }
            return (
              <button
                key={index}
                className="m-1 flex-shrink-0 overflow-hidden relative"
                style={{ width: '200px', height: '112.5px' }}
                aria-pressed={isSelected}
                onClick={() => {
                  onChangeContainedList(index)
                }}
              >
                <div
                  className={c(
                    'w-6 h-6 text-white text-sm flex items-center justify-center rounded-full absolute top-1 left-1 z-20',
                    isSelected ? 'bg-green-500' : 'bg-red-400',
                  )}
                >
                  <FontAwesomeIcon
                    icon={isSelected ? faCheck : faMinus}
                    className="opacity-100"
                    width="1rem"
                    height="1rem"
                  />
                </div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-red-100 z-10" />
                <img
                  src={previewUrl}
                  alt="画像"
                  className={c(
                    'object-cover pointer-events-none',
                    isSelected ? 'opacity-100' : 'opacity-50',
                  )}
                  style={{
                    width:
                      ((200.0 * template.col) /
                        parseInt(size.width.toString())) *
                      (imgSize.width ?? 0),
                    height:
                      ((112.5 * template.row) /
                        parseInt(size.height.toString())) *
                      (imgSize.height ?? 0),
                    objectPosition: `-${
                      ((200.0 * template.col) /
                        parseInt(size.width.toString())) *
                        (pos.x +
                          (parseInt(size.width.toString()) / template.col) *
                            col) +
                      col * 1 +
                      (row === template.row - 1 ? 100 * template.offset : 0)
                    }px -${
                      ((112.5 * template.row) /
                        parseInt(size.height.toString())) *
                        (pos.y +
                          (parseInt(size.height.toString()) / template.row) *
                            row) +
                      row * 2.5
                    }px`,
                  }}
                />
              </button>
            )
          }),
        )}
      </div>
      <div className="flex-shrink-0 flex flex-col items-center w-full pt-4 mt-auto">
        <div className="flex mb-8">
          <button
            className={c(
              'flex font-bold mx-4 border-2 rounded-md px-2 py-1 hover:shadow-md transition-all',
              filter === 'checked' ? 'border-blue-400' : 'border-transparent',
            )}
            onClick={() => setFilter(filter === 'checked' ? 'none' : 'checked')}
            aria-pressed={filter === 'checked'}
          >
            <div className="w-6 h-6 text-white text-sm flex items-center justify-center rounded-full bg-green-500 mr-2">
              <FontAwesomeIcon icon={faCheck} width="1rem" height="1rem" />
            </div>
            <span>{containedList.filter((x) => x).length}</span>
          </button>
          <button
            className={c(
              'flex font-bold mx-4 border-2 rounded-md px-2 py-1 hover:shadow-md transition-all',
              filter === 'unchecked' ? 'border-blue-400' : 'border-transparent',
            )}
            onClick={() =>
              setFilter(filter === 'unchecked' ? 'none' : 'unchecked')
            }
            aria-pressed={filter === 'unchecked'}
          >
            <div className="w-6 h-6 text-white text-sm flex items-center justify-center rounded-full bg-red-400 mr-2">
              <FontAwesomeIcon icon={faMinus} width="1rem" height="1rem" />
            </div>
            <span>{containedList.filter((x) => !x).length}</span>
          </button>
        </div>
        <button
          className="pl-4 pr-8 py-2 bg-pink-400 text-white rounded-md relative shadow-sm transition hover:shadow-lg"
          onClick={goNext}
        >
          OK <span className="animate-bounce-right absolute">→</span>
        </button>
      </div>
    </div>
  )
}

export default Confirm
