import React, { useEffect, useState } from 'react';
import {Image} from 'cloudinary-react';

function Main() {

    const [imageIds, setImageIds] = useState();

    const loadImages = async () => {
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
            <h1 className='title'>MAIN</h1>
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
    );
}

export default Main;