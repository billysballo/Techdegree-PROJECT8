// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

const leftArrow = document.getElementById("left");

const rightArrow = document.getElementById("right");


//MAIN CARDS 
function displayEmployees(employeeData) {
					employees = employeeData;
					// store the employee HTML as we create it
					let employeeHTML = '';
					// loop through each employee and create HTML markup
					employees.forEach((employee, index) => {
					let name = toTitleCase(employee.name.first);
					let surname=toTitleCase(employee.name.last);
					let email = employee.email;
					let city = toTitleCase(employee.location.city);
					let picture = employee.picture;
					// template literals make this so much cleaner!
					employeeHTML += `
					<div class="card" data-index="${index}">
					<img class="avatar" src="${picture.large}" />
					<div class="text-container">
					<h2 class="name">${name} ${surname}</h2>
					<p class="email">${email}</p>
					<p class="address">${city}</p>
					</div>
					</div>
					`
							});
				gridContainer.innerHTML = employeeHTML;
				}
//FETCH API 
					
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))

// OVERLAY DATA 
function displayModal(index) {
// use object destructuring make our template literal cleaner
			let { name, dob, phone, email, location: { city, street, state, postcode
			}, picture } = employees[index];
			let date = new Date(dob.date);
			const modalHTML = `
					<img class="modal-avatar" src="${picture.large}" />
					<div class="text-container">
					<h2 class="modal-name">${name.first} ${name.last}</h2>
					<p class="modal-email">${email}</p>
					<p class="modal-city">${city}</p>
					<hr />
					<p class="modal-phone">${phone}</p>
					<p class="modal-address">${street}, ${state} ${postcode}</p>
					<p class="modal-birthday">Birthday:
					${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
					</div>	`;
			overlay.classList.remove("hidden");
			overlay.setAttribute("data-index",`${index}`)
			modalContainer.innerHTML = modalHTML;
}

//DISPLAY OVERLAY
gridContainer.addEventListener('click', e => {
// make sure the click is not on the gridContainer itself
		if (e.target !== gridContainer) {
		// select the card element based on its proximity to actual element clicked
		const card = e.target.closest(".card");
		const index = card.getAttribute('data-index');
		displayModal(index);
		}
		});

	modalClose.addEventListener('click', () => {
	overlay.classList.add("hidden");
});

//FUNCTION LIBRARY
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function hideEmployee(){

	    let inputField = document.getElementById('search-field').value.toLowerCase();
	    var cards= document.querySelectorAll(".card")
	    cards.forEach( card=> card.classList.add("hidecard"))
	    
	    cards.forEach( card=> card.innerText.indexOf(inputField)>-1 ? card.classList.remove("hidecard"):"")

}



//EVENT LISTENER
  const searchBar = document.getElementById("search-field");
  searchBar.addEventListener("keyup", hideEmployee);




  rightArrow.addEventListener("click", (e)=>{
    let currentIndex = e.target.parentNode.parentNode.getAttribute("data-index")
    currentIndex=parseInt(currentIndex)
    var cards= document.querySelectorAll(".card")
     if(currentIndex < cards.length-1){
        var newIndex= currentIndex+1;
        displayModal(newIndex);
     }else if (newIndex >cards.length){
     	newIndex=0
     	displayModal(newIndex)}
   
  });

leftArrow.addEventListener("click", (e)=>{
    let dataIndex = e.target.parentNode.parentNode.getAttribute("data-index")
    let currentIndex=parseInt(dataIndex)
    var cards= document.querySelectorAll(".card")
     if(currentIndex >=1){
        var newIndex= currentIndex-1;
        displayModal(newIndex);
        console.log("new",newIndex); console.log("ddd"); console.log("current",currentIndex)
     }
   else if(dataIndex=="0" ){
   	console.log("done")
   }
  });
