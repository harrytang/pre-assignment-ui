/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import axios from 'axios';

const baseUrl: string = 'https://dwellet-api.harrytang.com/apartments';
//const baseUrl: string = 'http://localhost:3030/apartments';

const getAll = (pagination: {limit: number, skip: number}) => {
    const request = axios.get(`${baseUrl}/?$limit=${pagination.limit}&$skip=${pagination.skip}&$sort[createdAt]=-1`);
    return request.then(response => response.data);
};

const create = (newObject: object) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data)
};

const update = (id: string, newObject: object) => {
    const request = axios.patch(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data)
};

const remove = (id: string) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
};

export default {
    getAll,
    create,
    update,
    remove
}