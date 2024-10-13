import axios from 'axios'

const cabeceros = {
    'content-type':'application/json'
}

const cabeceros_upload = {
    'content-type':'multipart/form-data'
}

//Crear un nuevo usuario
const addUser = async (data) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}user`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//hacer login
const loginUser = async (data) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}login`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//obteniendo los datos del usuario logueado
const getDataUserLogin = async (token) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}profile-user`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

// obteniendo los contadores del usuario logueado
const getDataCounter = async (token,id='') =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}show-counters/${id}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}

//actualizando los datos del usuario logueado
const updateDataUser = async (data,token) =>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}update`, data, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//update image del usuario logueado
const updateImageUser = async (data,token) =>{

    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}update-image`, data, { 
            headers: {
                'content-type':'multipart/form-data',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//obtener los datos de todos los usuarios menos el usuario logueado
const getDataAllUser = async (token,pagina) =>{
    
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}list?pagina=${pagina}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//metodo para seguir un usuario
const followingUser = async (data,token) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}follow/follow`, data, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//metodo para dejar de seguir un usuario
const unfollowUser = async (id,token) =>{
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}follow/unfollow/${id}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//metodo para dejar de seguir un usuario
const userfollowing = async (token,id,pagina) =>{

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}follow/following/${id}?pagina=${pagina}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//metodo para dejar de seguir un usuario
const userfollow = async (token,id,pagina) =>{

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}follow/followers/${id}?pagina=${pagina}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//metodo para crear publicacion
const addNewPublicationUser = async (data,token) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}publication/create`, data, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}




//update image del usuario logueado
const updateImagePublication = async (data,token,id) =>{

    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}publication/uploadfile/${id}`, data, { 
            headers: {
                'content-type':'multipart/form-data',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}

//obtener los datos del usuario por id
const getDataUserForId = async (token,id) =>{

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}profile/${id}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//obtener Publicaciones de usuario por id
const getPublicationsForId = async (token,id,pagina) =>{
    console.log(`${import.meta.env.VITE_API_URL}publication/show-publications/${id}?pagina=${pagina}`)
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}publication/show-publications/${id}?pagina=${pagina}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//obtener imagen por id
const getImagePublicationForId = async (token,id) =>{

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}publication/show-image-publication/${id}`, { 
            headers: {
                'content-type':'application/json',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}


//elimina publicacion del usuario logueado
const deletePublicationForId = async (token,id) =>{

    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}publication/delete-publication/${id}`, { 
            headers: {
                'content-type':'multipart/form-data',
                'x-token':token
            } 
        });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response ? err.response.data : {status:'error',msg:err.message}
    }
}



export {
    addUser,
    loginUser,
    getDataUserLogin,
    getDataCounter,
    updateDataUser,
    updateImageUser,
    getDataAllUser,
    followingUser,
    unfollowUser,
    userfollowing,
    userfollow,
    addNewPublicationUser,
    updateImagePublication,
    getDataUserForId,
    getPublicationsForId,
    getImagePublicationForId,
    deletePublicationForId
}