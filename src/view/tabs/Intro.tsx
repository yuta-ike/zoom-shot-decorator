import React from 'react'

type Props = {
  goNext: () => void
  className: string
}

const Intro: React.FC<Props> = ({ goNext, className }) => {
  return (
    <div className={className}>
      <p className="my-8">以下の3つの手順で簡単編集♪</p>
      <ol className="leading-9 text-xl">
        {['画像をアップロード', '人数を入力', 'デコレーション'].map(
          (text, i) => (
            <li key={i}>
              <span className="bg-blue-400 rounded-full w-8 h-8 inline-block text-white mr-4 px-auto text-center my-2">
                {i + 1}
              </span>
              {text}
            </li>
          ),
        )}
      </ol>
      <button
        className="my-8 pl-4 pr-8 py-2 bg-pink-400 text-white rounded-md relative shadow-sm transition hover:shadow-lg"
        onClick={goNext}
      >
        スタート
        <span className="animate-bounce-right absolute inline-block">→</span>
      </button>
    </div>
  )
}

export default Intro
