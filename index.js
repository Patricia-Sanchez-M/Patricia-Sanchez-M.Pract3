//FUNCION PARA HACER LA PETICION CON PROMISES
const peticion = function (url) {
  return fetch(url, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la petición");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//fUNCION PARA CAMBIAR EL IDIOMA
const cambiarIdioma = (idioma) => {
  console.log(idioma);
  if (idioma === "es") {
    peticion("./api/es.home.json")
      .then((objeto) => {
        //Selecciona todos los elementos que tienen el atributo data-translate
        let elementos = document.querySelectorAll("[data-translate]");

        //Itera sobre los elementos y traduce su texto a español
        elementos.forEach((elem) => {
          let clave = elem.getAttribute("data-translate");
          console.log(clave);
          elem.innerHTML = objeto[clave];
          document.cookie = "language=es; path=/";
        });
      })
      .catch((error) => {
        console.log(error);
      });
      
  } else if (idioma === "en") {
    peticion("./api/en.home.json")
      .then((objeto) => {

        //Selecciona todos los elementos que tienen el atributo data-translate
        let elementos = document.querySelectorAll("[data-translate]");

        //Itera sobre los elementos y traduce su texto a ingles
        elementos.forEach((elem) => {
          let clave = elem.getAttribute("data-translate"); //aqui se coge la parte del HTML que contiene el texto a traducir
          console.log(clave);
          elem.innerHTML = objeto[clave]; //aqui se cambia el texto que figura en el HTML por el traducido
          document.cookie = "language=en; path=/"; //aqui actualizamos el valor de la cookie para que el idioma cuando se recargue la pagina sea ingles
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

//FUNCION PARA OBTENER EL VALOR DE LA COOKIE EN RELACION AL ULTIMO LENGUAJE SELECCIONADO POR EL USUARIO
function getCookieValue(name) {
  const cookies = document.cookie.split(';');
  for(let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    //busco en la cookie la cadena 'name='
    if(cookie.startsWith(name + '=')) {
      //utilizo esta sintaxis para que la funcion me devuelva el valor de la cookie, sin el 'name='
      return cookie.substring((name + '=').length, cookie.length);
    }
  }
  //si no encuentra ninguna cookie con el 'name' proporcionado, la funcion devuelve una cadena vacia
  return '';
}

//FUNCION PARA ESTABLECER EL IDIOMA DE LA PAGINA EN FUNCION DEL VALOR DE LA COOKIE
function loadLanguage() {
  //obtengo el valor de la cookie 'language', que sera 'es' o 'en'
  const language = getCookieValue('language');
  console.log(language);
  //modifico el idioma de la pagina con la funcion correspondiente en funcion del valor que devuelve la funcion anterior
  if(language === 'es') {
    cambiarIdioma("es");
  } else {
    cambiarIdioma("en");
  }
}

//CUANDO LA PAGINA SE RECARGA, SE EJECUTARA LA FUNCION DESCRITA ARRIBA
window.onload = loadLanguage; //controlador de eventos de 'window.onload'
