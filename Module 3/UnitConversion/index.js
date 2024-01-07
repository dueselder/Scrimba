/*
1 meter = 3.281 feet
1 liter = 0.264 gallon
1 kilogram = 2.204 pound
*/

const convertBtn = document.getElementById('convert-button');

convertBtn.addEventListener('click', () => {
    let input = document.getElementById('input').value;
    console.log(input);

    let lengthOut = input * 3.281;
    let volumeOut = input * 0.264;
    let massOut = input * 2.204;

    document.getElementById('length').innerHTML = `
    ${input} meters = ${lengthOut.toFixed(3)} feet | 
    ${input} feet = ${(input / 3.281).toFixed(3)} meters
    `
    document.getElementById('volume').innerHTML = `
    ${input} liters = ${volumeOut.toFixed(3)} gallons | 
    ${input} gallons = ${(input / 0.264).toFixed(3)} liters
    `
    document.getElementById('mass').innerHTML = `
    ${input} kilogram = ${massOut.toFixed(3)} pound | 
    ${input} pound = ${(input / 2.204).toFixed(3)} kilogram
    `
});