import Instance from '../axios/Instance';

export const getCategory = (page, size) => {
    const url = `/api/v1/category/list?page=${page}&size=${size}`;
    return Instance.get(url);
}
