const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')
const movie = require('../models/movieModel')

/* GET home page */
router.get('/celebs', (req, res, next) => {
  celebs.find()
  .then((allCelebs)=>{
    console.log(allCelebs)



    movie.find()
    .then((allMovies)=>{
      console.log(allMovies)
        res.render('celebs/index', {movies: allMovies, stars: allCelebs})
  
    })
    .catch((err)=>{
        next(err);
    })





  })
  .catch((err)=>{
      next(err);
  })


});


router.get('/celebs/details/:id', (req, res, next) => {
  celebs.findById(req.params.id)
  .then((thisCeleb)=>{
    console.log(thisCeleb)
      res.render('celebs/details/show', {celeb: thisCeleb})

  })
  .catch((err)=>{
      next(err);
  })

});

router.get('/celebs/movie/details/:id', (req, res, next) => {
  movie.findById(req.params.id).populate('celebs')
  .then((thisMovie)=>{
    celebs.findById(thisMovie.actors).then((thisActor)=>{

      console.log("=====>",thisMovie.actors)
      res.render('celebs/details/movie', {movie: thisMovie, cName: thisActor})

    })
  })
  .catch((err)=>{
      next(err);
  })

});

router.get('/celebs/new', (req, res, next)=>{
  res.render('celebs/new.hbs');
})

router.post('/celebs/', (req, res, next)=>{

  let cName = req.body.celebName;
  let cOccupation = req.body.celebOccupation;
  let cPhrase = req.body.celebPhrase;


  celebs.create({
      name: cName,
      occupation: cOccupation,
      catchPhrase: cPhrase,
  })
  .then((result)=>{

      res.redirect('/celebs/')

  })
  .catch((err)=>{
      next(err);
  })
})
router.post('/celebs/delete/:id', (req, res, next)=>{
  let id = req.params.id;

  celebs.findByIdAndRemove(id)
  .then((result)=>{
      res.redirect('/celebs/')
  })
  .catch((err)=>{
      next(err)
  })
})
router.get('/celebs/edit/:thisid', (req, res, next)=>{
  let id=req.params.thisid;
  celebs.findById(id)
  .then((thisGuy)=>{
      res.render('celebs/edit', {person: thisGuy})
  })
  .catch((err)=>{
      next(err)
  })
})


router.post('/celebs/update/:thisid', (req, res, next)=>{

  let id=req.params.thisid;
 console.log(id)
  celebs.findByIdAndUpdate(id, {

      name: req.body.updateName,
      occupation: req.body.updateOccupation,
      catchPhrase: req.body.updatePhrase

  })
  .then((result)=>{
      res.redirect('/celebs/details/'+id)
  })
  .catch((err)=>{
      next(err);
  })

})



module.exports = router;
