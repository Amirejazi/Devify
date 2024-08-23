import rules from './rules'

const validator = (value, validators) => {
    let validationResults = []
    
    for (const validator of validators) {
        if (validator.value === rules.requiredValue) {
            value.trim().length === 0 && validationResults.push(false)
        }
        if (validator.value === rules.minValue) {
            value.trim().length < validator.minLength && validationResults.push(false)
        }
        if (validator.value === rules.maxValue) {
            value.trim().length > validator.maxLength && validationResults.push(false)
        }
        if (validator.value === rules.emailValue) {
            !value.trim().include('@') && validationResults.push(false)
        }
    }
    
    return validationResults.length === 0
}

export default validator