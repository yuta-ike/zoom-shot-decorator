import React from 'react'
import c from 'classnames'
import NumberPicker from '../components/NumberPicker'

type Props = {
  previewUrl: string
  count: number
  onChangeCount: (count: number) => void
  goNext: () => void
  className: string
}

const MemberCount: React.FC<Props> = ({
  previewUrl,
  count,
  onChangeCount,
  goNext,
  className,
}) => {
  return (
    <div
      className={c(
        className,
        'flex flex-row items-center justify-between w-full',
      )}
    >
      <img src={previewUrl} alt="プレビュー画像" className="max-w-md" />
      <div className="mx-16 flex-shrink-0 flex flex-col items-center">
        <p className="mb-4">写っている人数を選択してください</p>
        <NumberPicker
          value={count}
          onChange={onChangeCount}
          min={2}
          max={49}
          labelRender={(value) => (
            <p>
              {value}
              <span className="text-sm">人</span>
            </p>
          )}
        />
        <button
          className="my-4 pl-4 pr-8 py-2 bg-pink-400 text-white rounded-md relative shadow-sm transition hover:shadow-lg"
          onClick={goNext}
        >
          OK
          <span className="animate-bounce-right absolute inline-block">→</span>
        </button>
      </div>
    </div>
  )
}

export default MemberCount
