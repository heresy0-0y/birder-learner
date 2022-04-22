

async function getCountryFromIP () {
    const response = await fetch('https://ip-api.com/json/')
    const data = await response.json()
    return data.countryCode
}

export default getCountryFromIP