let body = document.body;
let url = window.location.toString();
let preloader = document.querySelector('#wrap');

let userName = (url) => {
  let separatePart = url.split('=');
  let login = separatePart[1];
    if(login == undefined){
   	  login = 'DariaPanchenko';
    }
  return login;
} 

let date = new Date();
const getDate = new Promise((resolve, reject) => {
	setTimeout(()=> date ? resolve(date) : reject('Не обнаружено'), 2000)
});

let responseData = fetch(`https://api.github.com/users/${userName(url)}`);

function infoPerson(){
	let info = responseData;
	let datePromise = new Promise((resolve, reject)=>{
		setTimeout(()=>{
			resolve(info);
			reject('error');
		}, 4000)
	})
	return datePromise;
}

let infoPromise, datePromise;
Promise.all([infoPerson(), getDate]).then(([information,date])=> {
	 infoPromise = information; 
	 datePromise = date;
})
.then(data =>  infoPromise.json())
.then(infoUser => {
	let avatar = infoUser.avatar_url;
	let nameUsr = infoUser.login;
	let bioUsr = infoUser.bio;
	let linkUsr = infoUser.html_url;

	let addNameUsr = () => {
	  let userUrl = document.createElement('a');
	  let text = document.createTextNode(nameUsr);
	  let indention = document.createElement('br');
	    userUrl.href = linkUsr;
	    userUrl.appendChild(text);
        body.appendChild(userUrl); 
        body.appendChild(indention);      
	  }

	  let addAvatarUsr = () => {
	    let avaPerson = document.createElement('img');
	  	let indention = document.createElement('br');
	  	  avaPerson.src = avatar;
	  	  body.appendChild(avaPerson);
	  	  body.appendChild(indention);
	  }

	  let addBioUsr = () => {
	  	let bioPerson = document.createElement('p');
	  	  bioPerson.innerHTML = bioUsr;
	  	  body.appendChild(bioPerson);
	  }
      
      let addDate = () => {
      	let dateOnPage = document.createElement('p');
      	  dateOnPage.innerHTML = datePromise;
      	  body.appendChild(dateOnPage);
      }

      preloader.style.display = 'none';
	  addNameUsr();
	  addAvatarUsr();
	  addBioUsr();
	  addDate();	
})
.catch(error => alert('Информация о пользователе не доступна'));