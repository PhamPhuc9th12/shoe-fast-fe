import Instance from "../axios/Instance";
export const createOrder = (data) => {
    const url = `/api/v1/order/create`;
    return Instance.post(url, data);
}

export const getOrderById = (id) => {
    const url = `/api/v1/order?id=${id}`;
    return Instance.get(url);
}

export const getOrderDetailByOrderId = (id) => {
    const url = `/api/v1/order/order-detail?orderId=${id}`;
    return Instance.get(url);
}

export const getAllOrderStatus = () => {
    const url = `/api/v1/order/order-status`;
    return Instance.get(url);
}

export const getAllOrder = (id, status, page, size) => {
    const url = `/api/v1/order/list?accountId=${id}&orderStatusId=${status}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const cancelOrder = (data) => {
    const url = `/api/v1/order/cancel`;
    return Instance.post(url, data);
}
