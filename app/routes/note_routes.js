var ObjectID = require('Mongodb').ObjectID

module.exports = function(app, db) {

  app.get('/notes/:id', (request, response) => {
      // this will get an existing note from the database
      // this is making a request from the database
      const id = request.params.id
      // I've made a request for an id which gets stored into 'id'
      // now the 'id' is passed as a new object id to get passed into mongo
      const informations = { '_id': new ObjectID(id) };

      db.collection('notes').findOne(informations, (error, item) => {
        if (error) {
          response.send({ 'error': 'An error has occured' });
        } else {
          response.send(item)
        }
      });
  });

  app.delete('/notes/:id', (request, response) => {
      // this will get an existing note from the database
      // this is making a request from the database
      const id = request.params.id
      // I've made a request for an id which gets stored into 'id'
      // now the 'id' is passed as a new object id to get passed into mongo
      const informations = { '_id': new ObjectID(id) };

      db.collection('notes').remove(informations, (error, item) => {
        if (error) {
          response.send({ 'error': 'An error has occured' });
        } else {
          response.send("Note " + id + " was deleted!")
        }
      });
  });
  app.put('/notes/:id', (request, response) => {
      // this will get an existing note from the database
      // this is making a request from the database
      const id = request.params.id
      // I've made a request for an id which gets stored into 'id'
      // now the 'id' is passed as a new object id to get passed into mongo
      const informations = { '_id': new ObjectID(id) };
      // just like post you can edit the title and body
      const note = { text: request.body.body, title: request.body.title};
      db.collection('notes').update(informations, note, (error, item) => {
        if (error) {
          response.send({ 'error': 'An error has occured' });
        } else {
          response.send(item)
        }
      });
  });

  app.post('/notes', (request, response) => {
      // this will create a note here
        const note = { text: request.body.body, title: request.body.title};
        db.collection('notes').insert(note, (error, result) => {
          if (error) {
            response.send({ 'error': 'An error has occured' });
          } else {
            response.send(result.ops[0])
          }
        });
    });


};
