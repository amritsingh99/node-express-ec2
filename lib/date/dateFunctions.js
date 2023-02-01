import dateFormat from "dateformat"

export const convertDateToString = (date) => {
    // return date.getDate() + '-' + (date.getMonth()  1) + '-' + date.getFullYear();
    return dateFormat(date, "dd-mm-yyyy")
}

export const convertDateToRawString = (date) => {
    return dateFormat(date, 'ddmmyyyy')
}