const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/starter-code', {useNewUrlParser: true})
  .then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
  .catch(err => console.error('Error connecting to mongo', err));


  const movies = mongoose.model('movies', {
       title: String,
       actors: String,
    });


    movies.create([
       {
        title: 'The Shawshank Redemption',
        actors: "lauren",
      },
      {
        title: 'The Godfather',
        actors: "enrique",
      },
      {
        title: 'The Godfather: Part II',
        actors: "bobby",
      },
    ])