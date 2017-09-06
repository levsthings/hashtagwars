export const isValid = (tag) => {
    if (typeof tag === 'string' && tag.length >= 2) {
        return true
    } else {
        return false
    }
}
