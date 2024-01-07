// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
import { update } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-6fd2c-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")
let userId = localStorage.getItem("userId")

if (!userId) {
    userId = Math.floor(Math.random() * 1000000);
    localStorage.setItem("userId", userId);
}

const inputFieldEl = document.getElementById("input")
const fromUserEl = document.getElementById("fromUser")
const toUserEl = document.getElementById("toUser")
const publishButtonEl = document.getElementById("publish")
const endorsementEl = document.getElementById("endorsement")

publishButtonEl.addEventListener("click", function() {
    let fromUser = fromUserEl.value;
    let toUser = toUserEl.value;
    let endorsement = inputFieldEl.value;
    
    console.log(userId);

    let endorsementObject = {
        from: fromUser,
        to: toUser,
        text: endorsement,
        likes: { userId: false }
    };

    push(endorsementsInDB, endorsementObject);
    
    clearInputFieldEl();
});

onValue(endorsementsInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemObjects = Object.entries(snapshot.val())
    
        clearEndorsementListEl()
        
        for (let i = itemObjects.length - 1; i >= 0; i--) {
            let currentItem = itemObjects[i];

            let desiredObject = currentItem[1];
            
            appendItemToEndorsementListEl(desiredObject);
            console.log(desiredObject);
        }    
    } else {
        endorsementEl.innerHTML = "No items here... yet";
    }
})

function appendItemToEndorsementListEl(endorsementObject) {
    // Ensure likes is an object, not an array
    endorsementObject.likes = endorsementObject.likes || {};

    let newDiv = document.createElement("div");
    newDiv.innerHTML = `
        <div class="endorsement-card">
            <p class="from">From: ${endorsementObject.from}</p>
            <p class="endorsement-text">${endorsementObject.text}</p>
            <div class="to-likes-container">
                <p class="to">To: ${endorsementObject.to}</p>
                <div class="endorsement-likes">
                    <span class="likes-count">${Object.values(endorsementObject.likes).filter(Boolean).length}</span>
                    <span class="heart-icon">❤️</span>
                </div>
            </div>
        </div>
    `;

    // Add the event listener to the heart icon
    newDiv.querySelector(".heart-icon").addEventListener("click", function() {
        // Toggle the like status for the current user
        endorsementObject.likes[userId] = !endorsementObject.likes[userId];

        // Update the likes in the database
        let endorsementRef = ref(database, `endorsements/${endorsementObject.id}`);
        update(endorsementRef, {likes: endorsementObject.likes }).then(() => {
            // Update the likes count in the DOM only after the database update is successful
            newDiv.querySelector(".likes-count").textContent = Object.values(endorsementObject.likes).filter(Boolean).length;
        }).catch(error => {
            console.error("Error updating likes: ", error);
            // Optionally handle the UI here if the database update fails
        });
    });

    // Append the new div to the endorsementEl element
    endorsementEl.appendChild(newDiv);
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
    fromUserEl.value = "";
    toUserEl.value = "";
}

function clearEndorsementListEl() {
    endorsementEl.innerHTML = ""
}