import Instance from '../axios/Instance'

export const getSale = (page, size) => {
    const url = `/api/v1/sale/list?page=${page}&size=${size}`;
    return Instance.get(url);
}