import React, { useEffect, useReducer, useState } from 'react'
import './Input.css'
import validator from '../../validators/validator'

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.value,
                isValid: validator(action.value, action.validators)
            }
        default:
            return state
    }
}

function Input(props) {

    const [mainInput, dispatch] = useReducer(inputReducer, { value: '', isValid: false })
    const [statusClass, setStatusClass] = useState(null)

    const { value, isValid } = mainInput
    const { id } = props

    useEffect(() => {
        props.onInputHandler(id, value, isValid)

    }, [value])

    const onChangeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            value: e.target.value,
            validators: props.validators
        })
        if (statusClass) {
            if (mainInput.isValid)
                setStatusClass('success')
            else
                setStatusClass('error')
        }
    }

    const onBlurHandler = () => {
        if (mainInput.isValid)
            setStatusClass('success')
        else
            setStatusClass('error')
    }

    const element =
        props.element === 'texterea' ?
            (<textarea
                className={props.className}
                placeholder={`${props.className} ${statusClass}`}
                value={mainInput.value}
                onChange={onChangeHandler}
            />) :
            (<input
                type={props.type}
                className={`${props.className} ${statusClass}`}
                placeholder={props.placeholder}
                value={mainInput.value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
            />)

    return element
}

export default Input