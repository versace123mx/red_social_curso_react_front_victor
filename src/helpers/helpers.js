import Swal from 'sweetalert2'

const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha)
    const opcciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric',
        hour12: true // Cambia a true si prefieres el formato de 12 horas
    }
    return fechaNueva.toLocaleDateString('es-MX', opcciones)
}

const formatearNumero = (numero) => {
    return new Intl.NumberFormat().format(numero)
}

const acortarTexto = (valor, desde, hasta) => {
    return valor.substring(desde, hasta)
}

const showAlert = (titulo, mensaje, icono) => {
    Swal.fire({
        title: titulo,
        html: mensaje,
        icon: icono
    })
}

const showAlertConfirm = (titulo,mensaje,icono) => {
    return Swal.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si!"
    });
}
const expresion_correo = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
const expresion_password = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,20}$");

export {
    formatearFecha,
    formatearNumero,
    acortarTexto,
    showAlert,
    showAlertConfirm,
    expresion_correo,
    expresion_password
}