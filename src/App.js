import React from 'react'
import { useState } from 'react'
import analyzeImage from './services/azure-image-analysis.js'
import ImageAnalysisResults from './components/ImageAnalysisResults.js'
import dotenv from 'dotenv'
dotenv.config()

function App() {
  const [imageUrl, setImageUrl] = useState('')
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    setImageUrl(event.target.value)
  }

  const handleAnalysisClick = async () => {
    try {
      setLoading(true)
      const apiKey = process.env.API_KEY_MS
      const endpoint = "https://courseanalyzeimage.cognitiveservices.azure.com"
      const analysisResults = await analyzeImage(imageUrl, apiKey, endpoint)
      setResults(analysisResults)
    } catch (error) {
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  const DisplayResults = () => {
    if (loading) {
      return <p>Realizando análisis...</p>
    }

    if (results) {
      return (
        <div>
          <p>Resultados del análisis:</p>
          <pre>{JSON.stringify(results, null, 2)}</pre>
          <p>Imagen procesada desde: {imageUrl}</p>
        </div>
      )
    }

    return null
  }

  return <div>
    <h1>Image Analysis and Generation</h1>
      <label>Ingrese la dirección URL de la imagen:</label>
      <input type="text" value={imageUrl} onChange={handleInputChange} />
      <br />
      <button onClick={handleAnalysisClick} disabled={loading}>Analizar Imagen</button>
      <ImageAnalysisResults results={results} imageUrl={imageUrl} />
      {/* <button onClick={handleGenerationClick}>Generar Imágenes</button> */}
      <DisplayResults />
  </div>
}

export default App
