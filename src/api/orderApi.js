import axiosClient from './axiosClient.js'

export const createOrder = (params) => {
    let url = '/donhangs'
    console.log(params,'param')
    return axiosClient.post(url, params)
}

export const getAllOrder = (params) => {
    const url = '/donhangs';
    return axiosClient.get(url, {params})
} 

export const getFilterOrder = (params) => {
    const url = "/donhangs/filter";
    return axiosClient.get(url, { params });
  };

export const checkDiscount = (params) => {
    const url = `/giamgias/get-by-code/${params}`;
    return axiosClient.get(url)
}