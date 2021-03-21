import React, { useEffect } from 'react'

type Props = {
  className: string
  file: File | null
  onChangeFile: (file: File | null) => void
  goNext: () => void
}

const Upload: React.FC<Props> = ({ className, file, onChangeFile, goNext }) => {
  useEffect(() => {
    if (file != null) {
      goNext()
    }
  }, [file])

  return (
    <div className={className}>
      <label className="bg-pink-400 rounded-md px-4 py-2 text-white shadow-sm hover:shadow-md transition cursor-pointer focus-within:outline-black flex">
        <input
          type="file"
          className="w-1 h-1 opacity-0 absolute"
          accept="image/*"
          required
          onChange={(e) => onChangeFile(e.target.files?.[0] ?? null)}
        />
        <div>スクリーンショットをアップロード</div>
      </label>
    </div>
  )
}

export default Upload
