import React, { useState } from "react";
import styles from "../../styles/page.module.css";
import { initializeW3UpClient, uploadFileToW3 } from '../w3';
import { useWeb3 } from "../Web3Provider";

function VerifyForm() {
    const { contract } = useWeb3();
    const [ipfsHash, setIpfsHash] = useState("");
    const [imgHash, setImgHash] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "hash") {
            setIpfsHash(e.target.value);
        }
    }

    const verify = async () => {
        try {
            console.log(ipfsHash);
            const isStored = await contract.methods.isFileStoredByHash(ipfsHash).call();
            console.log('Is file stored by hash:', isStored);

            if (isStored) {
                console.log("Document present. You are a Valid seller.");
                const IPFShash = await contract.methods.getIpfsHashByHash(ipfsHash).call();
                console.log(`IPFS hash is stored in the smart contract: ${IPFShash}`);
                setImgHash(IPFShash);
                alert("Document present. You are a Valid seller.");
            } else {
                console.log("Document not present. You are not a valid seller.");
                setImgHash(null);
                alert("Document not present. You are not a valid seller.");
            }
        } catch (error) {
            console.error('Error verifying:', error);
        }
    };

    return (
        <div className={styles.verifyContainer}>
            <div className={styles.leftContainer}>
                <label className={styles.label}>Enter Hashkey: </label>
                <input type="text" name="hash" onChange={handleChange} className={styles.input}></input>
                <br />
                <button className={styles.button} onClick={verify}>Verify</button>
            </div>
            {imgHash && (
                <div className={styles.rightContainer}>
                    <h2 className={styles.resultHeader}>Registered Document:</h2>
                    <img
                        src={`https://${imgHash}.ipfs.w3s.link`}
                        alt="Uploaded"
                        className={styles.uploadedImage}
                    />
                </div>
            )}
        </div>
    );
}

export default VerifyForm;