# Lexical Density API
API where a user can query the complexity of a text segment.

## Prerequisites
Node.js v12.14.1  
MondoDB

## Installation

Clone the Repository:

```
git clone git@github.com:youxiberlin/ld-api-challenge.git
cd ld-api-challenge
```

## Running the application

Before start the app, please run the local instance of MongoDB

```
npm start
```

Example request
- To get overall lexical density of the input text.
```
// using httpie
http -f POST :3000/complexity text="hello world. what a beautiful day "
```

Response:
```
{
    "data": {
        "overall_ld": "0.17"
    }
}
```

- To use verbose mode and get lexical density of each sentence.
```
// using httpie
http -f POST :3000/complexity?mode=verbose text="hello world. what a beautiful day "
```
Response:
```
{
    "data": {
        "overall_ld": "0.17",
        "sentence_ld": [
            "0.00",
            "0.25"
        ]
    }
}
```

### Note
If the word or the character's number of the input text exceeds the limit that is set on the configuration, the api responds with status 400 and the message.

## Running the test
```
npm test
```
### Author
Developed by [Yuki Sato](https://github.com/youxiberlin)
