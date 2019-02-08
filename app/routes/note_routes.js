module.exports = function(app, db) {

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
