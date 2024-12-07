
const dataEndpoints = [
    {
        url : "https://api.api-ninjas.com/v1/jokes",
        query : "limit=3",
        concat : true,
        key : "joke"
    },
    {
        url : "https://api.api-ninjas.com/v1/facts",
        query : "limit=2",
        concat : true,
        key : "fact"
    },
    {
        url : "https://api.api-ninjas.com/v1/quotes",
        query : "",
        concat : false,
        key : "quote"
    },
    {
        url : "https://random-word-api.herokuapp.com/word?number=25&length=5",
        query : "",
        concat : false,
        key : "words"
    },
];

const randomNumber = () => Math.floor(Math.random()*dataEndpoints.length);

export const getRandomEndpoint = () =>  {
    const randomIndex = randomNumber();
    console.log(randomIndex)
    return dataEndpoints[randomIndex];
}