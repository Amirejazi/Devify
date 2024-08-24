const testEmail = (value) => {
    const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/g
    return emailPattern.test(value)
}

const testCodeMelli = (value) => {
    // Test
}

const testPhoneNumber = (value) => {
    // Test
}

export default {
    testEmail,
    testCodeMelli,
    testPhoneNumber
}