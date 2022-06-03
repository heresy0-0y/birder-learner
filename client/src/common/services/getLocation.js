async function getCountryFromIP() {
  const response = await fetch("https://ipapi.co/json/").catch((error) => {
    return "US";
  });
  if (!response.ok) {
    return "US";
  } else {
    const data = await response.json();

    return data.country;
  }
}

export default getCountryFromIP;
