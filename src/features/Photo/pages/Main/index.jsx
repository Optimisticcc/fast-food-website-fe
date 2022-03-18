import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Link } from 'react-router-dom';
import Banner from '../../../../components/Banner';
import { useDispatch, useSelector } from 'react-redux';
import PhotoCard from 'features/Photo/components/PhotoCard';
import {removePhoto} from 'features/Photo/photoSlice'
Main.propTypes = {
    
};

function Main(props) {
    const photos = useSelector(state => state.photos)
    const dispatch = useDispatch()
    const handleRemove = (photo) => {
        console.log(photo, photo.id)
        const action = removePhoto(photo.id)
        dispatch(action)
    }
    return (
        <div className="text-center">
            <Banner />
            <Link to="/photos/add" className="btn-blue my-2 inline-block">Add new photo</Link>
            <div className="grid grid-cols-4 w-4/5 mx-auto gap-4">
                {photos.map((photo,index) => (
                    <PhotoCard photo={photo} key={index} onRemovePhoto={handleRemove}/>
                ))}
            </div>
        </div>
    );
}

export default Main;