import Instance from "../axios/Instance";

export const getAllProducts = (page, size, active) => {
    const url = `/api/v1/product/get-all?page=${page}&size=${size}&active=${active}`;
    return Instance.get(url);
}

export const filterProducts = (data) => {
    const url = `/api/v1/product/get-all/filter`;
    return Instance.post(url, data);
}

export const getProductById = (id) => {
    const url = `/api/v1/product?id=${id}`;
    return Instance.get(url);
}

export const relateProduct = (id, brandId) => {
    const url = `/api/v1/product/relate?brandId=${brandId}&id=${id}&page=0&size=20`;
    return Instance.get(url);
}

export const searchByKeyword = (page, size, keyword) => {
    const url = `/api/v1/product/search?page=${page}&size=${size}&search=${keyword}`;
    return Instance.get(url);
}

export const countProduct = () => {
    const url = `/api/v1/product/count`;
    return Instance.get(url);
}

export const getAllProductsByBrand = (brand, page, size) => {
    const url = `/api/v1/product/by-brand?brandId=${brand}&page=${page}&size=${size}`;
    return Instance.get(url);
}

export const createProduct = (data) => {
    const url = `/api/v1/product/create`;
    return Instance.post(url, data);
}