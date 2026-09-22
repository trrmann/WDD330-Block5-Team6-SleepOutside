const baseURL = import.meta.env.VITE_SERVER_URL;
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(/*category*/) {
    this.baseURL = baseURL;
    //this.category = category;
    //this.path = `../json/${this.category}.json`;
  }
  /*getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }*/
  async getData(category) {
    const response = await fetch(`${this.baseURL}products/search/${category} `);
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(category, id) {
    const products = await this.getData(category);
    return products.find((item) => item.Id.toLowerCase() === id?.toLowerCase());
  }
}
