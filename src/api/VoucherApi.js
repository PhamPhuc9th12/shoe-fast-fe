import Instance from '../axios/Instance'

export const getVoucherByCode = (code) => {
    const url = `/api/v1/voucher/by-code?code=${code}`;
    return Instance.get(url);
}

export const getVouchers = (page, size) => {
    const url = `/api/v1/voucher/list?page=${page}&size=${size}`;
    return Instance.get(url);
}
export const createVoucher = (data) => {
    const url = `/api/v1/voucher/create`;
    return Instance.post(url, data);
}
export const getVoucherDetail = (id) => {
    const url = `/api/v1/voucher/detail/${id}`;
    return Instance.get(url);
}