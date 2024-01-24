import React from "react";
import { useState } from "react";
import styles from "../../styles/page.module.css";
import { initializeW3UpClient, uploadFileToW3 } from '../w3';
import { useWeb3 } from "../Web3Provider";

function UploadForm() {
    const { web3, accounts, contract } = useWeb3();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [result, setResult] = useState("");

    const handleChange = (e) => {
        if (e.target.name === "filename") {
            setFileName(e.target.value);
        }
        if (e.target.name === "file") {
            setFile(e.target.files[0]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const isStored = await contract.methods.isFileStored(fileName).call();
            console.log('Is file stored:', isStored);

            if (!isStored) {
                try {
                    await initializeW3UpClient();
                    const cid = await uploadFileToW3(file);
                    const hash = cid.toString();
                    setResult(hash);
                    console.log('Storing the data in IPFS');
                    const tx = await contract.methods.upload(fileName, hash).send({
                        from: accounts[0],
                    });

                    console.log('Transaction hash:', tx.transactionHash);
                } catch (error) {
                    console.error('File upload error:', error);
                }
            } else {
                console.log('Data is already stored for this IPFS hash');
                const storedHash = await contract.methods.getIpfsHash(fileName).call();
                console.log(`IPFS hash is already stored in the smart contract: ${storedHash}`);
                alert(`Data is already stored for this IPFS hash. \nIPFS hash is already stored in the smart contract: ${storedHash}`)
                setFileName('');
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={styles.uploadContainer}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <label className={styles.label}>Enter Unique Filename: </label>
                <input type="text" name="filename" value={fileName} onChange={handleChange} className={styles.input}></input>
                <br />
                <input type="file" name="file" onChange={handleChange} className={styles.input}></input>
                <br />
                <input type="Submit" className={styles.button}></input>
            </form>
            {result && (
                <><h2 className={styles.resultHeading}>IPFS Hash</h2>
                    <p className={styles.resultHash}>{result}</p></>   
            )}
        </div>
    );
}

export default UploadForm;

