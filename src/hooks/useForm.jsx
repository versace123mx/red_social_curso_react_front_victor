import React, { useState } from 'react'

const useForm = () => {

    const [form, setForm] = useState({})

    //este es un metodo que cada que se hace un cambio en el imput se manda a llamar y se le pasa el target
    const change = ({ target }) => {
        const { name, value } = target//el target es el campo y se desestructura y se obtiene el name y el value

        setForm({
            ...form,
            [name]: value //al campo con el nombre [name] asignale el valor de value
        })
    }
    return {
        form,
        change
    }
}

export default useForm
