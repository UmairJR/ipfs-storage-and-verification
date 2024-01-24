import React from 'react'
import UploadForm from './components/UploadForm'
import styles from '../styles/page.module.css'

const Upload = () => {
  return (
    <div>
      <header className={styles.heading}>
        <h1>⁂<span>Store IPFS hash on blockchain</span>⁂</h1>
      </header>
      <UploadForm />
    </div>
  )
}

export default Upload