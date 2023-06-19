const { request, response } = require('express')
const {uploadFile} = require('../helpers/uploadFile')
const User = require('../models/user');
const Film = require('../models/film');
const path = require('path');
const fs = require('fs');



const uploadFileC= async (req = request, res = response) => {
    const file = req.files
    try {
       const name =  await uploadFile(file)
       console.log(file);

        res.json(name);

    } catch (error) {
        res.status(400).json({msg:"Error subiendo fichero"})    
    }
    

}

const updateImage= async (req = request, res = response) => {
    

    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }

    const { collection, id } = req.params;
    const file = req.files

    let model;

    console.log(file);

    try{
    if (collection=='user') {
        model = await User.findById(id);

    }else if(collection=='films'){
        model = await Film.findById(id);
    }
    

    if (model.img) {
        
        const nombreArr = model.img.split('/');
        if (!nombreArr.contains('res.cloudinary.com')) {
            fs.unlinkSync(model.img)
            
        }else{
            const nombre = nombreArr[nombreArr.length - 1];
            const [public_id] = nombre.split('.');
            cloudinary.uploader.destroy(public_id);
        }    
      }
  
      const { tempFilePath } = req.files.file;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
      model.img = secure_url;
      await model.save();
      res.status(200).json(model);
    } catch (msg) {
      return res.status(400).json({ msg });
    }

    // const name = await uploadFile(req.files, undefined, collection);
    // model.img = name;
    // res.status(200).json({model});

}




module.exports = {uploadFileC,updateImage}
