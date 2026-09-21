import { convertToJson } from "./utils.mjs";


export default class Alert {

    constructor(){
    this.path = `../json/alerts.json`;
    }

  

    async init(){
    const alertData = await this.getData();
    
    const alertList = document.createElement("section");
    alertList.classList.add('alert-list');

    alertData.forEach((item) => {  

    const alert =  document.createElement("p");
    alert.classList.add('alert');
    alert.style.backgroundColor = item.backgroundColor;
    alert.style.color = item.textColor;
    alert.style.borderColor = item.textColor;
    alert.textContent = item.message;

    //add to alert list
    alertList.appendChild(alert);
    });
    

    document.getElementById("main-body").prepend(alertList);
    }

    async getData(){
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
        };

}

