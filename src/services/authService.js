import api from '@/lib/api'

export const loginUser = (payload) =>
  api.post('/Auth/login', payload).then((res) => ({ status: res.status, data: res.data }))

export const registerDriver = (payload) =>
  api.post('/Auth/register-driver', payload).then((res) => res.data)

export const registerVendor = (payload) =>
  api.post('/Auth/register-vendor', payload).then((res) => res.data)

export const registerCarOwner = (payload) =>
  api.post('/Auth/register-car-owner', payload).then((res) => res.data)
