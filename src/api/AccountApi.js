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
    console.log(getInformation)
    return Instance.get(url, { headers });

}

