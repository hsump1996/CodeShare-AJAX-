const express = require("express");
const mongoose = require('mongoose');
const app = express();
const CodeSnippet = require('./db');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.post('/code_snippets/', (req, res) => {

    const codeSnippet = new CodeSnippet({
        _id: mongoose.Types.ObjectId(),
        title: req.body.title,
        code: req.body.code,
        comments: req.body.comments
    });

    codeSnippet.save(function(err, codeSnippet){

        if(err){
            res.json({error: err.message});
        }
        else{
            res.json(codeSnippet);
        }
    });

});

app.post('/code_snippets/:id/comments/', (req, res) => {


});

app.get('/code_snippets/', function(req, res) {
    CodeSnippet.find({}, function(err, result, count) {
      res.json(result.map(function(ele) {
        return {
          '_id': ele._id,
          'title': ele.title,
          'code': ele.code,
          'comment': ele.comments
        }; 
      }));
    });
  });

const port = 3000;

app.listen(port, () => {console.log(`Server is listening on ${port}`)});
