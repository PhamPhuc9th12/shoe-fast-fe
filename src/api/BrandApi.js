import Instance from "../axios/Instance";
export const getBrands = (page, size) => {
    const url = `/api/v1/brand/list?page=${page}&size=${size}`;
    return Instance.get(url);
}