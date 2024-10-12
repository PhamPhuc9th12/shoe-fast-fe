import Instance from "../axios/Instance";

export const modifyCartItem = (data) => {
    const url = `/api/v1/cart/modify`;
    return Instance.post(url, data);
}


export const isEnoughCartItem = (id, quantity) => {
    const url = `/api/v1/cart/check-stock?id=${id}&quantity=${quantity}`;
    return Instance.get(url);
}

export const getCartItemByAccountId = (id) => {
    const url = `/api/v1/cart/by-account?id=${id}`;
    return Instance.get(url);
}

export const removeCartItem = (data) => {
    const url = `/api/v1/cart/remove`;
    return Instance.post(url, data);
}