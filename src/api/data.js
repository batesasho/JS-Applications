import * as api from './api.js'

export async function getAllData() {
    return api.get(`/data/offers?sortBy=_createdOn%20desc`)
}

export async function getDataById(id) {
    return api.get(`/data/offers/` + id)
}

export async function createData(data) {
    return api.post(`/data/offers`, data)
}

export async function deleteDataById(id) {
    return api.del(`/data/offers/` + id)
}

export async function editDataById(id, data) {

    return api.put(`/data/offers/` + id, data)
}

// BONUS
export async function apply(offerId) {
    return api.post(`/data/applications`, {offerId})
}

export async function getTotalOffers(offerId) {
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,)
}

export async function getOfferByUser(offerId, userId) {
    return api.get(`/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}