import React from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ImageSlider = ({ images }) => {
    const imageItems = images.map((image) => ({
        original: image,
        thumbnail: image,
    }));

    return <ImageGallery additionalClass="slider" items={imageItems} />;
};

export default ImageSlider;
