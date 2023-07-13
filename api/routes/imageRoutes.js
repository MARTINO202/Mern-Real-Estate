const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

//cloudinary.config({
  //cloud_name: process.env.CLOUD_NAME,
  //api_key: process.env.CLOUD_API_KEY,
  //api_secret: process.env.CLOUD_API_SECRET
//})

//upload image to Cloudinary and return public id
cloudinary.config({ 
  cloud_name: 'dhu2q3rgf', 
  api_key: '758236962284777', 
  api_secret: '74HLsPk31uLsiizWcEjViYwxyTc' 
});

router.delete('/:public_id', async(req, res)=> {
  const {public_id} = req.params;
  try {
      await cloudinary.uploader.destroy(public_id);
      res.status(200).send();
  } catch (e) {
      res.status(400).send(e.message)
  }
})


module.exports = router;
