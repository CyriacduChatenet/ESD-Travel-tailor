export const testCityUtil = (value: string) => {
    const cityRegex = new RegExp(/^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/)
    return cityRegex.test(value)
}