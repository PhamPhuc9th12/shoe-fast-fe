import Instance from "../axios/Instance";
export const getAttribute = (id, size) => {
    const url = `/api/v1/attribute/get-by-product?productId=${id}&size=${size}`;
    return Instance.get(url);
}

export const getAttributeById = (id) => {
    const url = `/api/v1/attribute?id=${id}`;
    return Instance.get(url);
}