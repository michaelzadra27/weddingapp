import { upload } from '@testing-library/user-event/dist/upload';
import React from 'react';
import { useState } from 'react'
import "./reset.css"
import "./style.css"

function UploadPage() {
    const [fileUploadState, setFileUploadState] = useState('');
    
    const [previewSrc, setPreviewSrc] = useState('')

    //get file on click and set to preview
    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        preview(file);
    };

 //preview file selected using reader and converting to base64encodedimage   
    const preview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSrc(reader.result);
        }
    }

    const handleFileSubmit = (e) => {
        e.preventDefault();
        console.log("insubmit")
        if (!previewSrc) return;
        uploadMedia(previewSrc);
    }

    const uploadMedia = async (base64EncodedImage) => {
        console.log(base64EncodedImage)
        try {
            await fetch('api/upload',{
            method:'Post',
            body: JSON.stringify({data: base64EncodedImage}),
            headers: {'Content-type': 'application/json'}
        })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <div className="form-container">
            <h1 className="title">Brenda + Michael</h1>
            <h2>Please share your photos with us!</h2>
            <form onSubmit={handleFileSubmit}>
                <input type="file"
                    name="image"
                    onChange={handleFileUpload}
                    value={fileUploadState}
                    className="input-form"
                    multiple>
                </input>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
            {previewSrc && (
                <img src={previewSrc} alt='something' style={{ height: '300px' }} />

            )}
            </div>
        </div>
    );
}

export default UploadPage;