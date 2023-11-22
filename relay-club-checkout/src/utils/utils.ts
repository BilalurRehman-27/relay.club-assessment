export const isSubmitButtonDisabled = (
    touched: Record<string, unknown>,
    errors: Record<string, unknown>
) => {
    return Object.keys(touched).some((key: string) => errors[key])
}

export const isValidInput = (userInput: string): boolean => {
    const isValid = /^[a-zA-Z,]+$/.test(userInput)
    return isValid ? true : false
}
