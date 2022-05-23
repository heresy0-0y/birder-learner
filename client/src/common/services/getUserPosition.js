export function getUserPosition(){
    const promiseArray = [];
  
    if (navigator.standalone) {
      promiseArray.push(
        new Promise((resolve, reject) => {
          const wait = setTimeout(() => {
            clearTimeout(wait);
            reject('Location has timed out');
          }, 4000);
        })
      );
    }
  
    const getCurrentPositionPromise = new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 5000,
          maximumAge: 2000,
          enableHighAccuracy: true,
        });
      } else {
        reject(new Error('Browser does not support geolocation!'));
      }
    });
  
    promiseArray.push(getCurrentPositionPromise);
  
    return Promise.race(promiseArray);
  }