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

//admin
export const countOrderByName = () => {
    const url = `/api/v1/order/list/count`;
    return Instance.get(url);
}

export const countOrder = () => {
    const url = `/api/v1/order/count`;
    return Instance.get(url);
}

export const reportAmountYear = () => {
    const url = `/api/v1/order/synthesis/year`;
    return Instance.get(url);
}

export const reportByProduct = (page, size) => {
    const url = `/api/v1/order/synthesis/product?page=${page}&size=${size}`;
    return Instance.get(url);
}

export const getOrderByOrderStatusAndYearAndMonth = (status, year, month, page, size) => {
    const url = `/api/v1/order/synthesis/order-by-year-month?id=${status}&year=${year}&month=${month}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const getOrderByProduct = (id, page, size) => {
    const url = `/api/v1/order/synthesis/order-by-product?id=${id}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const reportAmountMonth = (year) => {
    const url = `/api/v1/order/synthesis/amount-month?year=${year}`;
    return Instance.get(url);
}
export const updateOrder = (data) => {
    const url = `/api/v1/order/update`;
    return Instance.post(url, data);
}
export const updateCancel = (data) => {
    const url = `/api/v1/order/admin/cancel-order`;
    return Instance.post(url, data);
}

export const updateProcess = (data) => {
    const url = `/api/v1/order/update-process`;
    return Instance.post(url, data);
}
export const updateShip = (data) => {
    const url = `/api/v1/order/admin/update-shipment`;
    return Instance.post(url, data);
}

export const updateSuccess = (data) => {
    const url = `/api/v1/order/admin/update-success`;
    return Instance.post(url, data);
}

export const getAllOrderAndPagination = (status, page, size) => {
    const url = `/api/v1/order/page-admin?page=${page}&size=${size}&status=${status}`;
    return Instance.get(url);
}
export const getOrderByOrderStatusBetweenDate = (status, from, to, page, size) => {
    const url = `/api/v1/order/admin/page-orders-between-date?id=${status}&from=${from}&to=${to}&page=${page}&size=${size}`;
    return Instance.get(url);
}