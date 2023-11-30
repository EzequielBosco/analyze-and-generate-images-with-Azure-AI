import React from 'react'

function ImageAnalysisResults({ results, imageUrl }) {
  if (!results) {
    return null
  }

  return (
    <div>
      <p>Resultados del análisis:</p>
      <pre>{JSON.stringify(results, null, 2)}</pre>
      <p>Imagen procesada desde: {imageUrl}</p>
    </div>
  )
}

export default ImageAnalysisResults