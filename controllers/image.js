import fetch from 'node-fetch';
import dotenv from 'dotenv';


dotenv.config({ path: './.env' });
const PAT = process.env.PAT;
const USER_ID = process.env.USER_ID;
const APP_ID = process.env.APP_ID;
const MODEL_ID = process.env.MODEL_ID;

const handleApiCall = (req,res) => {
  
    const returnClarifaiJSONRequestOptions = () => {
      
        const IMAGE_URL = req.body.input;

        const raw = JSON.stringify({
            "user_app_id": {
                "user_id": USER_ID,
                "app_id": APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": IMAGE_URL
                        }
                    }
                }
            ]
        });

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: raw
        };

        return requestOptions;

    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", returnClarifaiJSONRequestOptions())
        .then(response => response.json()) 
        .then(data => {
            // console.log(data)
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'));

};

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users').where('id','=',id)
    .increment('entries',1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to get entries'));
};

export { handleApiCall, handleImage };