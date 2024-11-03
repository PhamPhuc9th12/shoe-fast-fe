import Instance from '../axios/Instance'

export const getSale = (page, size) => {
    const url = `/api/v1/sale/list?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createSale = (data) => {
    const url = `/api/v1/sale/create`;
    return Instance.post(url, data);
}

export const getSaleDetail = (id) => {
    const url = `/api/v1/sale/detail/${id}`;
    return Instance.get(url);
}
export const updateSale = (data) => {
    const url = `/api/v1/sale/update`;
    return Instance.post(url, data);
}
