
    const svuotaRicetta = document.querySelector('#food-view');
    svuotaRicetta.innerHTML = '';

    const svuotaPodcast = document.querySelector('#spotify-view');
    svuotaPodcast.innerHTML = '';


function onJson(json){
    console.log('json ricevuto');
    console.log(json);
    const ricetta = document.querySelector('#food-view');
    ricetta.innerHTML = '';
    const results = json.hits;
    const num_results = results.length;
    for(let i=0; i<num_results; i++){
        const recipe_data = results[i];
        const titolo = recipe_data.recipe.label;
        const immagine = recipe_data.recipe.image;
        const recipe = document.createElement('div');
        recipe.classList.add('ric');
        const img = document.createElement('img');
        img.src = immagine;
        const caption = document.createElement('span');
        caption.textContent = titolo;
        recipe.appendChild(caption);
        recipe.appendChild(img);
        const ingredienti = recipe_data.recipe.ingredientLines;
        const num_ingredienti = ingredienti.length;
        for(let j=0; j<num_ingredienti; j++){
            const ingr = ingredienti[j];
            const caption_ingr = document.createElement('p');
            caption_ingr.textContent = ingr;
            recipe.appendChild(caption_ingr);
        }
        ricetta.appendChild(recipe);
    }
}

function onResponse(response){
    if(!response.ok){
        console.log('Risposta non valida');
        return null;
    }else{
        console.log('Risposta ricevuta');
        return response.json();
    }
}

function onFail(fail){
    console.log('Errore: ' + fail);
}

function funcJson(json){
    console.log('altro json ricevuto');
    console.log(json);
    const library = document.querySelector('#spotify-view');
    library.innerHTML = '';
    const results = json.episodes.items;
    const num_results = results.length;
    for(let i=0; i<num_results; i++){
        const library_data = results[i];
        const title = library_data.description;
        const url = library_data.external_urls.spotify;
        const container = document.createElement('div');
        container.classList.add('spot');
        const titolo = document.createElement('span');
        titolo.textContent = title;
        const url_descr = document.createElement('a');
        url_descr.href = url;
        const image = document.createElement('img');
        image.src = library_data.images[1].url;
        container.appendChild(titolo);
        url_descr.appendChild(image);
        container.appendChild(url_descr);
        library.appendChild(container);
    }

}

function search(event){
    event.preventDefault();
    const food_input = document.querySelector('#food');
    const food_value = encodeURIComponent(food_input.value);
    console.log('Eseguo ricerca: ' + food_value);
    rest_url = 'https://api.edamam.com/search?q=' + food_value + '&app_id=' + api_id + '&app_key=' + api_key;
    console.log('URL: ' + rest_url);
    fetch(rest_url).then(onResponse, onFail).then(onJson);
}

function onClick(event){
    event.preventDefault();
    const podcastValue = 'Cucina Naturale';

    fetch("https://api.spotify.com/v1/search?q=" + podcastValue + "&type=episode&limit=30&offset=0&market=IT",
    {
        headers: 
        {
            'Authorization': 'Bearer ' + token
        }
    }
    ).then(onResponse, onFail).then(funcJson);
}

function onTokenResponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}

function onTokenJson(json){
    console.log('Token preso');
    console.log(json);
    token = json.access_token;
}

const client_id = 'ccf23884d60d45a5a60ddaec87026e2e';
const client_secret = 'c37b9d4c366d44a181662be082d77444';

fetch("https://accounts.spotify.com/api/token", 
{
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: 
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
    }
}   
).then(onTokenResponse).then(onTokenJson);
const api_key = '55a23f27021b93378b1b779f1ee257da';
const api_id = 'a17b53ed';
const form = document.querySelector('form');
form.addEventListener('submit', search);


let token;
const spot = document.querySelector('#spot');
spot.addEventListener('click', onClick);

