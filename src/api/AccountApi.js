import Instance from '../axios/Instance'

export const getInformation = async (token) => {
    const url = `/api/v1/user/detail`;
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    return await Instance.get(url, { headers });
}

export const getAccountDetailByAccountId = async (id) => {
    const url = `/api/v1/user/detail?id=${id}`;
    return await Instance.get(url);
}

export const countAccount = async () => {
    const url = `/api/v1/user/admin/count`;
    return await Instance.get(url);
}


