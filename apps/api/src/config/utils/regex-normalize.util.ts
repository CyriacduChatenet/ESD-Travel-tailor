export const regexNormalizeSlug = (str: string) => {
    return str.normalize("NFD").replace(/ /g, "-").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "")
};