import React from 'react'
import '../assets/styles/PageLoader.scss'

const PageLoader = () => {
  return (
    <div className="page-loader">
      <div className="page-loader__container">
        <div className="page-loader__spinner">
          <div className="page-loader__dot"></div>
          <div className="page-loader__dot"></div>
          <div className="page-loader__dot"></div>
        </div>
        <p className="page-loader__text">Загрузка...</p>
      </div>
    </div>
  )
}

export default PageLoader