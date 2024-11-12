import Instance from '../axios/Instance';

export const getCategory = async (page, size) => {
    const url = `/api/v1/category/list?page=${page}&size=${size}`;
    return await Instance.get(url);
}
export const getCategoryDetail = async (id) => {
    const url = `/api/v1/category/detail/${id}`;
    return await Instance.get(url);
}

export const createCategory = async (data) => {
    const url = `/api/v1/category/create`;
    return await Instance.post(url, data);
}

export const updateCategory = async (data) => {
    const url = `/api/v1/category/update`;
    return await Instance.post(url, data);
}