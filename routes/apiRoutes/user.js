const mongoose = require('mongoose');
const multer = require('multer')
const sharp = require('sharp')

const Users = mongoose.model('users');

module.exports = app => {
    app.get('/api/getUser/:token', async (req, res) => {
        const token = req.params.token;

        try {
            const user = await Users.find({
                token
            });

            res.send(user);

        } catch (err) {
            console.log(err);
        }
    });

    const upload = multer({
        limits: {
            fileSize: 1000000
        },
        fileFilter(req, file, cb) {
            if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
                return cb(new Error('Please upload an image file'))
            }

            cb(undefined, true)
        }
    })

    app.post('/api/upload-image/:token', upload.single('upload-image'), async (req, res) => {
        let token = req.params.token
        let file = req.file
        let { goal, weight } = req.body
        
        if (token) {
            const image = await sharp(file.buffer).resize({ width: 350, height: 350 }).png().toBuffer()
    
            await Users.findOneAndUpdate({
                token
            }, {
                image,
                goal,
                weight
            })
    
            res.send('Settings updated!')
        } else {
            res.send('Please login to save settings')
        }
        
    }, (error, req, res, next) => {
        res.send(error.message)
    })

    app.get('/api/user-image/:token', async (req, res) => {

        let token = req.params.token

        try {
            const user = await Users.find({
                token
            })

            if (!user || user.image) {
                throw new Error()
            }

            res.set('Content-Type', 'image/png')
            res.send(user[0].image)
        } catch(e) {
            res.status(404).send()
        }

    })
}