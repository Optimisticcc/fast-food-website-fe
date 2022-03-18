import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
// component photo card 
PhotoCard.propTypes = {
    photo: PropTypes.object,
    onRemovePhoto: PropTypes.func,
};
PhotoCard.defaultProps = {
    photo: null,
    onRemovePhoto: null
}
function PhotoCard(props) {
    const {  onRemovePhoto, photo } = props
    const history = useHistory()
    const handleClickEdit = () => {
        history.push(`photos/${photo.id}`)
    }
    const handleClickRemovePhoto = (photo) => {
        if(onRemovePhoto){
            onRemovePhoto(photo)
        }
    }
    return (
        <div className="w-full aspect-w-1 aspect-h-1 overflow-hidden relative group rounded-md">
            <img src={photo.image} alt="" className="absolute w-full h-full transform group-hover:scale-105 transition-transform duration-1000" />
            <div className="w-full h-full absolute left-0 top-0 opacity-0 group-hover:opacity-100 flex transition-all duration-500 flex-wrap items-center justify-center bg-gray-500 bg-opacity-40">
                <div className="text-center">
                <p className="w-full">{photo.title}</p>
                <p className="w-full">{photo.category}</p>
                <button className="btn-yellow" onClick={handleClickEdit}>Edit</button>
                <button className="btn-yellow" onClick={() => handleClickRemovePhoto(photo)}>Remove</button>
                </div>
            </div>
        </div>
    );
}

export default PhotoCard;