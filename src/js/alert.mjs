import { convertToJson } from "./utils.mjs";

export default class AlertDisplay {

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

    const xButton = document.createElement('p');
    xButton.innerHTML = 'X';
    xButton.style.backgroundColor = item.backgroundColor;
    alert.appendChild(xButton);

    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    alert.addEventListener('click', function(e) {
        if( this.contains(e.target) && e.target.innerHTML == 'X') { // how can you tell if they clicked on the X or on something else?  hint: check out e.target.tagName or e.target.innerText
            alertList.removeChild(this);
        }
    })

    //add to alert list
    alertList.appendChild(alert);
    });
    

    document.getElementsByTagName("main")[0].prepend(alertList);
    }

    async getData(){
        return fetch(this.path)
            .then(convertToJson)
            .then((data) => data);
        };

}

