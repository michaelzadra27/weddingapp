import React, { useEffect, useState } from 'react';
import {Image} from 'cloudinary-react';
import {Cloudinary} from "@cloudinary/url-gen";

// Import plugins
import {AdvancedImage, lazyload, accessibility, responsive, placeholder} from '@cloudinary/react';

import "./reset.css"
import "./style.css"

function Main() {

    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
        console.log("trying to load")
        try {
            const res = await fetch('/api/images');
            const data = await res.json();
            console.log(data)
            setImageIds(data);
        } catch (error) {
            
        }
    }
    useEffect(() =>{
        loadImages();
    }, [])

    return (
        <div>
            <div className='main-container'>
            <h1 className='title'>MAIN PAGE</h1>
            {imageIds && imageIds.map((imageId, index) => (
                <Image
                key={index}
                cloudName='dcteqhlcf'
                publicId={imageId}
                width="300"
                crop="scale"
                />
            ))}
            </div>
        </div>
    );
}

export default Main;