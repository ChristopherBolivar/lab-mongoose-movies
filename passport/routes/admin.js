const express = require('express');
const router  = express.Router();
const celebs = require('../models/celebModel')
const movie = require('../models/movieModel')
const user = require('../models/user')

//checking to see if a user is logged in, and if user an admin
// router.use((req, res, next)=>{
      
//   if(!req.user){
//       req.flash('error', 'please log in to use this feature')
//       res.redirect('/login')
//   }
//   if(!req.user.isAdmin){
//       req.flash('error', 'you do not have access to this feature')
//       res.redirect('/')
//   }

//   next();
// })



router.get('/create-new-account', (req, res, next)=>{
  res.render('user-views/new-account')
})

router.get('/active-users', (req, res, next)=>{
  user.find()
    .then((allUsers)=>{

        res.render('user-views/active', {users: allUsers})

    })
    .catch((err)=>{
        next(err);
    })
})



module.exports = router;
