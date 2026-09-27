const baseURL = import.meta.env.VITE_SERVER_URL;
const checkoutURL = baseURL + "/checkout";


async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {name: 'serviceError', message: await res.json()};
  }
}

export default class ExternalServices {
  constructor() {  }


  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }
  
  async findProductById(id) {

    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    

    return data.Result;
  }

  async checkout(jsonData) {
  
  const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonData)}

  return await fetch(checkoutURL, options).then(convertToJson);
  };

}

