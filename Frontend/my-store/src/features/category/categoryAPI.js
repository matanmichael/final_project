import axios from 'axios'

const URL_ADMIN = "http://127.0.0.1:8000/categories/"
const URL_USER = "http://127.0.0.1:8000/getcategories/"

export function getcats() {
    return new Promise((resolve) =>
        axios(URL_USER).then((res) => resolve({ data: res.data }))
    );
}

export function savecat(newCategory) {
    return new Promise((resolve) =>
        axios.post(URL_ADMIN,newCategory,{
            headers: {
                'Authorization': `Bearer ${newCategory.userToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}

export function removecat(id) {
    return new Promise((resolve) =>
      axios.delete(URL_ADMIN + id.categoryId,{
        headers:{
          'Authorization':`Bearer ${id.userToken}`
      
        }  
      }).then((res) => resolve({ data: res.data }))
    );
  } 

export function updatecat(updateCategory) {
    return new Promise((resolve) =>
        axios.put(URL_ADMIN + updateCategory.categoryId,updateCategory,{
            headers: {
                'Authorization': `Bearer ${updateCategory.userToken}`
            }
        }).then((res) => resolve({ data: res.data }))
    );
}