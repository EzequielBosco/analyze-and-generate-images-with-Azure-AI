import axios from 'axios'

const analyzeImage = async (imageUrl, apiKey, endpoint) => {
  try {
    const apiUrl = `${endpoint}/vision/v4.0/analyze?visualFeatures=Description,Tags,Adult`

    const response = await axios.post(apiUrl, { url: imageUrl }, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
    })

    return response.data
  } catch (error) {
    console.error('Error al analizar la imagen:', error.response || error)
    throw error
  }
}

export default analyzeImage