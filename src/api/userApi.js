import axiosClient from "./axiosClient";
// get tat ca product
// export const getAllImage = (params) => {
//     const url = '/hinhanhs';
//     return axiosClinet.get(url, {params})
// } 
// // lay 1 bai viet theo slug
// export const removeAImage = (id) => {
//     const url = `/sanphams/${id}`
//     return axiosClinet.delete(url)
// }

export const login = (params) => {
    const url = '/khachhangs/login'
    return axiosClient.post(url,params)
}


export const getUserById = (id) => {
    const url = `/khachhangs/${id}`
    return axiosClient.get(url)
}

export const saveUser = (params) => {
    const id = params.id
    let url = '/khachhangs'
    let urlRegister = '/khachhangs'
    if(id == 0){
        return axiosClient.post(urlRegister, params)
    }else{
        url = url + `/profile`
        return axiosClient.put(url, params)
    }
}
export const me = () => {
    const url = '/khachhangs/me'
    return axiosClient.get(url)
}