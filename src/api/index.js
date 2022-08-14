import axios from 'axios'

export const getProducts = async () => {
  return axios.get('http://sva.talana.com:8000/api/product/')
}
export const getProductCategories = async () => {
  return axios.get('http://sva.talana.com:8000/api/product-category/')
}