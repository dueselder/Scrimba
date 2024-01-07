import { propertyForSaleArr } from "./properties/propertyForSaleArr"
import { placeholderPropertyObj } from "./properties/placeholderPropertyObj"

function getPropertyHtml(properties = [placeholderPropertyObj]) {

    const propertyHTML = properties.map(function(properties){
            
        const totalPropertySize = properties.roomsM2.reduce((totalValue, currentValue) => totalValue + currentValue)
        
        return `
            <section class="card">
            <img src="/images/${properties.image}">
            <div class="card-right">
                <h2>${properties.propertyLocation}</h2>
                <h3>GBP ${properties.priceGBP}</h3>
                <p>${properties.comment}</p>
                <h3>${totalPropertySize} m²</h3>
            </div>
            </section>
        `;
    }).join('');
    return propertyHTML
}

/***** Modify 👇 by adding an argument to the function call ONLY. *****/
document.getElementById('container').innerHTML = getPropertyHtml()