import Instance from '../axios/Instance';

export const getCategory = (page, size) => {
    const url = `/api/v1/category/list?page=${page}&size=${size}`;
    return Instance.get(url);
}
export const getCategoryDetail = (id) => {
    const url = `/api/v1/category/detail/${id}`;
    return Instance.get(url);
}

export const createCategory = (data) => {
    const url = `/api/v1/category/create`;
    return Instance.post(url, data);
}

export const updateCategory = (data) => {
    const url = `/api/v1/category/update`;
    return Instance.post(url, data);
}