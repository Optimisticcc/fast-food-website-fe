import React from "react";
import PropTypes from "prop-types";
import PhotoForm from "../../components/PhotoForm";
import Banner from "../../../../components/Banner";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto,updatePhoto } from "features/Photo/photoSlice";

AddEdit.propTypes = {};

function AddEdit(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { photoId } = useParams();
  const isAddMode = !photoId;
  const editPhoto = useSelector((state) =>
    state.photos.find((p) => p.id === +photoId)
  );
  const initialValues = isAddMode ? {
    title: "",
    category: null,
    image: "",
  }
  : editPhoto
  const handleSubmit = (values) => {
    if (isAddMode) {
      const action = addPhoto(values);
      history.push("/photos");
      dispatch(action);
      return;
    }
    const action = updatePhoto(values);
    dispatch(action);
    history.push("/photos");
  };
  return (
    <div>
      <Banner />
      <Link to="/photos">Back to home photos</Link>
      <PhotoForm onSubmit={handleSubmit} initialValues={initialValues} />
    </div>
  );
}

export default AddEdit;
