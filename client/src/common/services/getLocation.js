

async function getCountryFromIP () {
    const response = await fetch('https://http://ip-api.com/json/')
    const data = await response.json()
    return data.countryCode
}

export default getCountryFromIP