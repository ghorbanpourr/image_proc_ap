const clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '69b5acba32bc452c87ec1bcdd50f5f64'
});

const handleApi = (req, res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data)
        })
        .catch(err => res.status(400).json('unable to deal with'))
}


const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to access entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApi: handleApi
}