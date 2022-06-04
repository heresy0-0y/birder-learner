async function getCountryFromIP() {
  try {
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      return "US";
    } else {
      const data = await response.json();

      return data.country;
    }
  } catch (error) {
    return "US";
  }
}

export default getCountryFromIP;
