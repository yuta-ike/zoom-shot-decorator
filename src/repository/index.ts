import axios from 'axios'

const postShotData = async (
  file: File,
  rects: [number, number, number, number][],
) => {
  const formData = new FormData()
  formData.append('file', file)
  rects.forEach((rect) => formData.append('rects[]', rect.join(',')))
  const res = await axios.post(
    'https://image-processing.work/image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  console.log(res)
}

export default postShotData
