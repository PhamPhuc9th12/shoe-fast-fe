import Instance from '../axios/Instance'

// export const getInformation = (token) =>{
//     const url = `/api/v1/user/detail?Authorization=${"Bearer " + token}`;
//     return Instance.get(url);
// }

export const getInformation = (token) => {
    const url = `/api/v1/user/detail`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return Instance.get(url, { headers });
}

export const getAccountDetailByAccountId = (id) => {
    const url = `/api/v1/user/detail?id=${id}`;
    return Instance.get(url);
}
