// Variable declarations
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");
let users = [];

// Fethes the data for 12 users from randomuser.me then parses the data and passes the array to the generateUsers function.
fetch('https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,cell,dob')
    .then((data) => data.json())
    .then(res => generateUsers(res.results))
    .catch(err => console.error('There was an error fetching the data:' + err));

// Generates the HTML based on the array of user objects passed to it and inserts the HTML into the gallery div.
function generateUsers (data) {
    users = data;
    let html = '';
    users.forEach(element => {
        //console.log(`${element.picture.thumbnail} - ${element.name.first} ${element.name.last}: ${element.location.city}, ${element.location.state} - ${element.email}`);
        html += `<div class="card"><div class="card-img-container">`;
        html += `<img class="card-img" src=${element.picture.large} alt="profile picture">`
        html += `</div><div class="card-info-container">`;
        html += `<h3 id="name" class="card-name cap">${element.name.first} ${element.name.last}</h3>
                <p class="card-text">${element.email}</p>
                <p class="card-text cap">${element.location.city}, ${element.location.state}</p>`
        html += `</div></div>`;
    });
    gallery.insertAdjacentHTML('beforeend', html);
}

// Creates the Modal and adds it to the body of the HTML.
function generateModal (user) {
    body.insertAdjacentHTML('beforeend',`<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="modal-text">${user.email}</p>
                <p class="modal-text cap">${user.location.city}</p>
                <hr>
                <p class="modal-text">${normalizeCell(user.cell)}</p>
                <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                <p class="modal-text">Birthday: ${normalizeDOB(user.dob.date)}</p>
            </div>
        </div>
    </div>`);
}

// Loops through the users array and return any user with an email matching the email parameter.
function returnUserOBJ (email) {
    for (let i = 0; i < users.length; i++) {
        if ((users[i].email) === email) {
            return users[i];
        }
    }
}

// Normalize cell phone with regex.
// I learned how to do this from https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function normalizeCell (cell) {
    cell = cell.replace(/[^\d]/g, "");

    if (cell.length == 10) {
        return cell.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
    } else {
        return "Invalid Cell #";
    }
}

// This function returns a normalized DOB.
function normalizeDOB (dob) {
    dob = dob.substring(0, 10);
    dob = dob.replace(/[^\d]/g, "");

    if (dob.length == 8) {
        return dob.replace(/(\d{4})(\d{2})(\d{2})/, "$2/$3/$1");
    } else {
        return "Invalid DoB";
    }
}

// Adds an event listener to the gallery div. If a user card is clicked, it calls the generateModal function.
gallery.addEventListener("click", (e) => {
    let email = "";

    let target = e.target;
    let targetParent = e.target.parentElement;
    let targetGrandparent = e.target.parentElement.parentElement;

    if (target.className === "card") {
        email = target.querySelector(`p.card-text`).textContent;

    } else if (targetParent.className === "card") {
        email = targetParent.querySelector(`p.card-text`).textContent;

    } else if (targetGrandparent.className === "card") {
        email = targetGrandparent.querySelector(`p.card-text`).textContent;
    }
    
    if (email !== "") {
        generateModal(returnUserOBJ(email));
    }
});

// Adds an event listener the the body. If a modal exit button is selected, it removes the modal.
body.addEventListener("click", (e) => {
    if (e.target.id === "modal-close-btn" || e.target.parentElement.id === "modal-close-btn") {
        document.querySelector("body > div.modal-container").remove();
    }
})