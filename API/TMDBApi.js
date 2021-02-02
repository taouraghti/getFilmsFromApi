const API_TOKEN="b7961f153c09b4a7e9ed193848f55bcb"

export function getFilmsFromApiWithSearchedText(text){

    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN +'&language=fr&query='+text;
    return fetch(url)
        .then((response) => response.json())
        .catch((error) => console.log(error))
}

export function getImageFromApi(name)
{
    return 'https://image.tmdb.org/t/p/w300/' + name
}