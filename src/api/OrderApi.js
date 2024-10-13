export const createOrder = (data) => {
    const url = `/api/v1/order/create`;
    return Instance.post(url, data);
}