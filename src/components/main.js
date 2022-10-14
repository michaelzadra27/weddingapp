import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import { Cloudinary } from "@cloudinary/url-gen";

// Import plugins
import { AdvancedImage, lazyload, accessibility, responsive, placeholder } from '@cloudinary/react';

import "./reset.css"
import "./style.css"

function Main() {

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

    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
        console.log("trying to load")
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            //randomize by shuffling data here before it gets saved to imageIds variable
            console.log(data)
            const shuffledData = data.sort(() => Math.random() - 0.5)
            console.log(shuffledData)
            setImageIds(shuffledData);
        } catch (error) {

        }
    }
    useEffect(() => {
        loadImages();
    }, [])

    return (
        <div>
            <div className='main-container'>
                <nav className='nav-bar'>
                    <h1 className='title'>Brenda & Michael
                    </h1>
                    <p className='sub-title'>10.15.22</p>
                </nav>
                <h3>Share what you captured to our site!</h3>
                <div className="form-container">
                    <button id="upload_widget" className="upload-button" onClick={handleOpenWidget}>Upload Pictures</button>
                </div>
                
                {imageIds && imageIds.map((imageId, index) => (
                    <Image
                        key={index}
                        cloudName='dcteqhlcf'
                        publicId={imageId}
                        width="370"
                        crop="scale"
                    />
                ))}
            </div>
        </div>
    );
}

export default Main;