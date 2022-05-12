async function getCountryFromIP() {
  const response = await fetch("https://ipapi.co/json/");
  const data = await response.json();
  return data.country;
}

export default getCountryFromIP;
