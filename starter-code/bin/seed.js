const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  const celebirty = mongoose.model('celebirty', {
       name: String,
       occupation: String,
       catchPhrase: String,
    });


    celebirty.create({
      name: 'David Hasslehoff',
      occupation: 'Actor',
      catchPhrase: 'Dont hassle the hoff',
    })