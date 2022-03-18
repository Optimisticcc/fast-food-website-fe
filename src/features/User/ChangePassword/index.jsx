import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveUser } from "api/userApi";
import { store } from 'react-notifications-component';

ChangePassword.propTypes = {};

function ChangePassword() {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.me.user);
    const [initialValues, setInitialValues] = useState({
        password: "",
        repassword: "",
    })
    const handleSubmit = async (values) => {
        const action = await saveUser(
            {
                password: values.password,
                id: user.id,
            })
            .then(
                store.addNotification({
                    title: "Wonderful!",
                    message: "Update password successfully",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: false
                    }
                })
            )
            .catch(err => store.addNotification({
                title: "Oops!",
                message: "Update password failed\n" + err.message,
                type: 'danger',
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"],
                animationOut: ["animate__animated animate__fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: false
                }
            }))
        history.push("/account");
        return;
    };
    return (
        <>
            <ChangePasswordForm onSubmit={handleSubmit} initialValues={initialValues} />
        </>
    );
}

export default ChangePassword;
