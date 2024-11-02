import Instance from "../axios/Instance";
export const getBrands = (page, size) => {
    const url = `/api/v1/brand/list?page=${page}&size=${size}`;
    return Instance.get(url);
}
export const createBrand = (data) => {
    const url = `/api/v1/brand/create`;
    return Instance.post(url, data);
}

export const getBrandDetail = (id) => {
    const url = `/api/v1/brand/detail/${id}`;
    return Instance.get(url);
}
export const updateBrand = (data) => {
    const url = `/api/v1/brand/update`;
    return Instance.post(url, data);
}
