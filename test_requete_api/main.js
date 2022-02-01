async function requeteApi(aliment){
  let APP_ID = "e323e869";
  let APP_KEY = "7e75073a08906ea21a48e21d07af238b";

  return fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${aliment}`).then(response => {
    if(response.status >=200 && response.status < 300){
      return response.json();
    }else{
      return new Error('Erreur serveur');
    }
  })
  .catch(error => {
    alert(error);
    throw new Error('Erreur charge,ent');
  });
}

function download(content){
  const a = document.createElement("a");
  a.href=URL.createObjectURL(new Blob([content],{type: "text/plain"}));
  a.setAttribute("download","data.txt");
  a.download = "fichier.json"
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function clicker(){
  let rep = await requeteApi('pizza');
  download(JSON.stringify(rep))
}
/*
function enregistrer2(){
  rep = requeteApi('pizza');
  var fs = require('fs');
  fs.writeFile("fichier.json",JSON.stringify(rep),function(err){
    if (err) throw err;
    console.log('complete');
  });
}
*/