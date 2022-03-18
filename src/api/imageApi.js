import axiosClient from "./axiosClient";

export const getAllImage = (params) => {
    const url = '/hinhanhs';
    return axiosClient.get(url, {params})
} 