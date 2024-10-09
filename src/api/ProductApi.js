import Instance from "../axios/Instance";

export const getAllProducts = (page, size, active) => {
    const url = `/api/v1/product/get-all?page=${page}&size=${size}&active=${active}`;
    return Instance.get(url);
}

export const filterProducts = (data) => {
    const url = `/api/v1/product/get-all/filter`;
    return Instance.post(url, data);
}