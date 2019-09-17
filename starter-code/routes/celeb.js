const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  celebs.find()
  .then((allCelebs)=>{
    console.log(allCelebs)
      res.render('celebs/index', {stars: allCelebs})

  })
  .catch((err)=>{
      next(err);
  })

});

router.get('/celebrities/details/:id', (req, res, next) => {
  console.log("============>",req.params.id)
  var id = req.params.id
  celebs.findById(req.params.id)
  .then((thisCeleb)=>{
    console.log(thisCeleb)
      res.render('celebs/details/show', {celeb: thisCeleb})

  })
  .catch((err)=>{
      next(err);
  })

});

router.get('/celebrities/new', (req, res, next)=>{
  res.render('celebs/new.hbs');
})

router.post('/celebrities/', (req, res, next)=>{

  let cName = req.body.celebName;
  let cOccupation = req.body.celebOccupation;
  let cPhrase = req.body.celebPhrase;


  celebs.create({
      name: cName,
      occupation: cOccupation,
      catchPhrase: cPhrase,
  })
  .then((result)=>{

      res.redirect('/celebrities/')

  })
  .catch((err)=>{
      next(err);
  })
})
router.post('/celebrities/delete/:id', (req, res, next)=>{
  let id = req.params.id;

  celebs.findByIdAndRemove(id)
  .then((result)=>{
      res.redirect('/celebrities/')
  })
  .catch((err)=>{
      next(err)
  })
})
router.get('/celebrities/edit/:thisid', (req, res, next)=>{
  let id=req.params.thisid;
  celebs.findById(id)
  .then((thisGuy)=>{
      res.render('celebs/edit', {person: thisGuy})
  })
  .catch((err)=>{
      next(err)
  })
})


router.post('/celebrities/update/:thisid', (req, res, next)=>{

  let id=req.params.thisid;
 console.log(id)
  celebs.findByIdAndUpdate(id, {

      name: req.body.updateName,
      occupation: req.body.updateOccupation,
      catchPhrase: req.body.updatePhrase

  })
  .then((result)=>{
      res.redirect('/celebrities/details/'+id)
  })
  .catch((err)=>{
      next(err);
  })

})



module.exports = router;
