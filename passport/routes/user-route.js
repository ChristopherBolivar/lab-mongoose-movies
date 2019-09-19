const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')
const movie = require('../models/movieModel')
const user = require('../models/user')
const bcrypt = require('bcryptjs')
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
/* GET home page */
router.get('/signup', (req, res, next) => {
  res.render('user-views/signup.hbs');
});

router.post('/signup', (req, res, next)=>{

  const username = req.body.theUsername;
  const password = req.body.thePassword;
  const salt  = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);



  user.create({
      username: username,
      password: hash,
      isAdmin: false
  })
  .then(()=>{

      res.redirect('/')

  })
  .catch((err)=>{
      next(err)
  })
})

router.get('/login', (req, res, next) => {
  res.render('user-views/login.hbs');
});

router.post('/login', (req, res, next)=>{
  const username = req.body.theUsername;
  const password = req.body.thePassword;

  // we are trying to find a user who's username is equal to the usernam variable we just created
user.findOne({ username: username })
.then(userfromDB => {
    if (!userfromDB) {
      res.redirect('/');
    }
    if (bcrypt.compareSync(password, userfromDB.password)) {
      // Save the login in the session!
      req.session.currentuser = userfromDB;
      // this is the magic ^ line of code that actually logse you in
      res.redirect("/");
    } else {
        res.redirect('/')
    }
})
.catch(error => {
  next(error);
})




})

router.post('/logout', (req, res, next)=>{

  req.session.destroy();

  res.redirect('/');

})


router.get('/secret', (req, res, next)=>{

  if(req.session.currentuser){
      res.render('user-views/secret', {theUser: req.session.currentuser})
  } else{
      res.redirect('/')
  }

})





module.exports = router;