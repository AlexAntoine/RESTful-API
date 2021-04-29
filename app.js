const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view enging', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/wikiDB', {useNewUrlParser: true});

const articleSchema = new mongoose.Schema({

    title: String,

    content: String 
})

const article = mongoose.model('articals', articleSchema);

app.listen(process.env.PORT|| 3000, ()=>{
    console.log('listening on port 3000');
});

//Get articles from DB
app.get('/articles', (req, res)=>{

   article.find((error, foundArticles)=>{
        if(error)
        {
            return res.send(error);
        }
        else
        res.send(foundArticles);
   });

});

//Post articles from DB
app.post('/articles', (req,res)=>{

    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new article({
        title: req.body.title,
        content: req.body.content

    });

    newArticle.save((error)=>{

        if(!error)
        {
            res.send('Success');
        }
        else
        res.send(error);
    });
});

//delete articles from DB
app.delete('/articles', (req, res)=>{

    article.deleteMany((error)=>{

        if(!error)
        {
            return res.send('deleted all articles');
        }
        else 
        return res.send(error)
    })

});

app.get('/', (req, res)=>{
    res.send('<p>Hello Bitches</p>');
});

