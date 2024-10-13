import Instance from '../axios/Instance'

export const getVoucherByCode = (code) => {
    const url = `/api/v1/voucher/by-code?code=${code}`;
    return Instance.get(url);
}