import axios from 'axios'

const postShotData = async (
  file: File,
  rects: [number, number, number, number][],
) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append(
    'rects',
    JSON.stringify(
      rects.map((rect) => ({ x: rect[0], y: rect[1], w: rect[2], h: rect[3] })),
    ),
  )
  const res = await axios.post('https://api.zoom-deco.net/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  })

  const images: string[] = res.data.result.image
  return images
}

export default postShotData
