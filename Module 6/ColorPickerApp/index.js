const getColorSchemeBtn = document.getElementById('get-color-scheme');

async function fetchColorScheme(baseColor, mode) {
    const response = await fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=${mode}&count=5`);
    const data = await response.json();
    return data;
}

async function fetchData() {
    let colorPicker = document.getElementById('color-picker').value;
    let hexColor = colorPicker.substring(1); // Remove the leading '#' if present
    let colorMode = document.getElementById('mode').value;

    let colors = await fetchColorScheme(hexColor, colorMode);
    console.log(colors);

    colors.colors.forEach((color, index) => { 
        console.log(color.hex.value);
        let colorDiv = document.getElementById(`color-${index+1}`);
        let colorNameDiv = document.getElementById(`color-${index+1}-value`);
        if (colorDiv) {
            colorDiv.style.backgroundColor = color.hex.value; 
            colorNameDiv.innerHTML = color.hex.value;
        }
        
    });
}

getColorSchemeBtn.addEventListener('click', function () {
    fetchData();
});
