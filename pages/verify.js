import React from 'react'
import VerifyForm from './components/VerifyForm'
import styles from '../styles/page.module.css'

const Verify = () => {
    return (
        <div>
            <header className={styles.heading}>
                <h1>⁂<span>Verify IPFS hash on blockchain</span>⁂</h1>
            </header>
            <VerifyForm />
        </div>
    )
}

export default Verify