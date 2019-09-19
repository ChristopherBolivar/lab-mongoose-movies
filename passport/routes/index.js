const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')
const movie = require('../models/movieModel')

/* GET home page */
router.get('/', (req, res, next) => {
  // res.send(req.session)
  res.render('index', {theUser: req.session.currentuser});
});

router.get('/celebs/newmovie', (req, res, next)=>{
  celebs.find()
    .then((thisGuy)=>{
        res.render('celebs/newmovie.hbs', {allCelebs: thisGuy});
    })
})

router.post('/celebs/newmovie/', (req, res, next)=>{

  let mTitle = req.body.mTitle;
  let mStar = req.body.star;
  let mDirector = req.body.mDirector

  console.log('=--=-=-=-', req.body)


  movie.create({
      title: mTitle,
      actors: mStar,
      director: mDirector,
  })
  .then((result)=>{

      res.redirect('/celebs/')

  })
  .catch((err)=>{
      next(err);
  })
})



module.exports = router;
