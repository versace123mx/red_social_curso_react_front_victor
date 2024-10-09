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
    console.log(token)
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

    console.log(`${import.meta.env.VITE_API_URL}list?pagina=${pagina}`)
    
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
/*
const getImageForName = async (name) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}mostrar-imagen-nombre/${name}`, { headers: cabeceros});
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}
*/

const getArticulos = async () =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}listar`, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
    }
}

const addArticulo = async (data) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}crear`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}

const uploadImage = async (data,id) =>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}subir-imagen/${id}`,data, { headers: cabeceros_upload });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}

const deliteArticulo = async (id) =>{
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}deletearticuloforid/${id}`, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}

const buscaArticulos = async (busqueda) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}buscar/${busqueda}`, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
    }
}

const getArticuloXId = async (id) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}getarticuloforbyid/${id}`, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
    }
}

const EditArticulo = async (id,data) =>{
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}articulo/${id}`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
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


    getArticulos,
    addArticulo,
    uploadImage,
    deliteArticulo,
    buscaArticulos,
    getArticuloXId,
    EditArticulo
}