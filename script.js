let page = 1;
const btnBack = document.getElementById('btnBack');
const btnNext = document.getElementById('btnNext');


btnNext.addEventListener('click', () => {
    if(page < 1000){
        page += 1;
        loadFilms();
    }
    
});

btnBack.addEventListener('click', () => {
    if(page > 1){
        page -= 1;
        loadFilms();
    }
    
})


//guardamos en la variable loadFilms una función anónima asyncrona
const loadFilms = async() => {

    //Pedimos que intente acceder al API con nuestra key y usamos fetch como get para la APi
    try{
        const answer = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=397ae037c69980e23f110cf6c3e7b246&page=${page}`);

        //condicional para responder si el status es una respuesta óptima
        if(answer.status === 200){

            //usamos una variable data para guardar el uso de un método .json() asyncrono en answer para poder acceder a la info json que nos devuelve la petición
            const data = await answer.json();


            let films = "";
            data.results.forEach(film => {
                films += `
                <div class="film">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${film.poster_path}">
                    <h3 class="title">${film.title}</h3>
                </div>
                
                `;              
            });
            document.getElementById('container').innerHTML = films;
        }
        //condicional si aparece un error 401, 404 u otros
        else if(answer.status === 401){
            console.log("The key is not correct, try again");
        }
        else if(answer.status === 404){
            console.log("The film does not exist");
        }
        else{
            console.log("Undefined error");
        }

    }
    catch(error){//Mostramos el error
        console.log(error);
    };
};

loadFilms();