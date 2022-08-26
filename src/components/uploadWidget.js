import { upload } from '@testing-library/user-event/dist/upload';
import React from 'react';
import { useState } from 'react'
import "./reset.css"
import "./style.css"

function UploadWidget() {

    const handleOpenWidget = () => {
        var myWidget = window.cloudinary.createUploadWidget({
            cloudName: 'dcteqhlcf',
            uploadPreset: 'wedding_uploads'
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                console.log('Done! Here is the image info: ', result.info);
            }
        }
        )
        //Open Widget
        myWidget.open();
    }

    return (
        <div>
            <div className="form-container">
            <button id="upload_widget" className="upload-button" onClick={handleOpenWidget}>Share Pictures</button>
            </div>
        </div>
    );
}

export default UploadWidget;