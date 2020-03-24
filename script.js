let body = document.body;
let url = window.location.toString();

let userName = (url) => {
  let separatePart = url.split('=');
  let login = separatePart[1];
    if(login == undefined){
   	  login = 'DariaPanchenko';
    }
  return login;
}

let responseData = `https://api.github.com/users/${userName(url)}`;

fetch(responseData).then(data => data.json())
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

	  addNameUsr();
	  addAvatarUsr();
	  addBioUsr();
	
})
.catch(error => alert('Информация о пользователе не доступна'));