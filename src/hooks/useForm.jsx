import React, { useState } from 'react'

const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj)

    const change = ({ target }) => {
        const { name, value } = target

        setForm({
            ...form,
            [name]: value
        })
    }
    return {
        form,
        change
    }
}

export default useForm
