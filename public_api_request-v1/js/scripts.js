// Variable declarations
const gallery = document.querySelector("#gallery");

// Fethes the data for 12 users from randomuser.me then parses the data and passes the array to the generateUsers function.
fetch('https://randomuser.me/api/?results=12&nat=us&inc=picture,name,email,location')
    .then((data) => data.json())
    .then(res => generateUsers(res.results));

// Generates the HTML based on the array of user objects passed to it.
function generateUsers (users) {
    users.forEach(element => {
        console.log(`${element.picture.thumbnail} - ${element.name.first} ${element.name.last}: ${element.location.city}, ${element.location.state} - ${element.email}`);
    });
}