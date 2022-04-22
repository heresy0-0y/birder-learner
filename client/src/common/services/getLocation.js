

async function getCountryFromIP () {
    const response = await fetch('http://ip-api.com/json/?fields=countryCode')
    const data = await response.json()
    return data.countryCode
}

export default getCountryFromIP