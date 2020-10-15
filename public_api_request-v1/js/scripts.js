// Variable declarations
const gallery = document.querySelector("#gallery");
let users = [];

// Fethes the data for 12 users from randomuser.me then parses the data and passes the array to the generateUsers function.
fetch('https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location,cell,dob')
    .then((data) => data.json())
    .then(res => generateUsers(res.results));

// Generates the HTML based on the array of user objects passed to it.
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
    gallery.insertAdjacentHTML('beforeend',html);
}