import axios from 'axios'

const URL_ADMIN = "http://127.0.0.1:8000/products/"
const URL_USER = "http://127.0.0.1:8000/getproducts/"
const URL_ALL_PRODS = "http://127.0.0.1:8000/getallproducts/"
// async(2)
export function getprods(catId) {
    return new Promise((resolve) =>
        axios(URL_USER + catId).then((res) => resolve({ data: res.data }))
        
    );
}
export function getallprods() {
    return new Promise((resolve) =>
        axios(URL_ALL_PRODS).then((res) => resolve({ data: res.data }))
        
    );
}

export function saveprod(newProduct) {
    return new Promise((resolve) =>
        axios.post(URL_ADMIN,newProduct,{
            headers: {
                'Authorization': `Bearer ${newProduct.userToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}

export function removeprod(id) {
    return new Promise((resolve) =>
      axios.delete(URL_ADMIN + id.productId,{
        headers:{
          'Authorization':`Bearer ${id.userToken}`
      
        }  
      }).then((res) => resolve({ data: res.data }))
    );
  } 

export function updateprod(updateProduct) {
    return new Promise((resolve) =>
        axios.patch(URL_ADMIN + updateProduct.productId,updateProduct,{
            headers: {
                'Authorization': `Bearer ${updateProduct.userToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}
