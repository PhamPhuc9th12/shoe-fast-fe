import Instance from '../axios/Instance'

export const registerAccount = (data) =>{
    const url = `/api/v1/user/create`;
    return Instance.post(url, data);
}
export const signIn = (data) =>{
    const url = '/api/v1/user/login';
    return Instance.post(url, data);
}