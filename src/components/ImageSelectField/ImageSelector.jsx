import React from 'react';
import PropTypes from 'prop-types';

ImageSelector.propTypes = {
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    onImageChange: PropTypes.func,
    onRandomButtonBlur : PropTypes.func,
};

ImageSelector.defaultProps = {
    name: '',
    imageUrl: '',
    onImageChange: null,
    onRandomButtonBlur: null
}
const getRandomImage = () => {
    const random = Math.trunc(Math.random() * 2000)
    return `https://picsum.photos/id/${random}/300/300`
}
function ImageSelector(props) {
    const { name,imageUrl, onImageChange, onRandomButtonBlur } = props
    const handleRandomImageClick = () => {
        if(onImageChange){
            const randomImageUrl = getRandomImage()
            onImageChange(randomImageUrl)
        }
    }
    return (
        <div>
            <button className="btn-yellow" name={name} onBlur={onRandomButtonBlur} onClick={handleRandomImageClick} type="button">Random image</button>
            {imageUrl && <img src={imageUrl} alt="Oops not found..." className="my-2 rounded" onError={handleRandomImageClick}/>}
        </div>
    );
}

export default ImageSelector;