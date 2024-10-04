import axios from 'axios'

const cabeceros = {
    'content-type':'application/json'
}

const cabeceros_upload = {
    'content-type':'multipart/form-data'
}


const addUser = async (data) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}user`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}

const loginUser = async (data) =>{
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}login`,data, { headers: cabeceros });
        return response.data; // Retorna los datos si es necesario
    } catch (err) {
        console.log("Fallo la comunicación", err.response ? err.response.data : err);
        return err.response.data
    }
}


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
    
    getArticulos,
    addArticulo,
    uploadImage,
    deliteArticulo,
    buscaArticulos,
    getArticuloXId,
    EditArticulo
}