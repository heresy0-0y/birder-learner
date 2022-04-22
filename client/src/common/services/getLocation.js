import axios from 'axios'

async function getCountryFromIP () {
 try {

     const response = await axios.get('https://ip-api.com/json/', {
        headers: {"Access-Control-Allow-Origin": "*"}
     })
     const data = response.data
     return data.countryCode
    } catch (error) {
        console.log(error)
    }
}

export default getCountryFromIP