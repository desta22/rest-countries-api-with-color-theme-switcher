export function isEmpty(obj) {

    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);

}
