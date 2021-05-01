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

app.get('/', (req, res)=>{
    res.send('<p>Hello Bitches</p>');
});


app.route('/articles')

.get((req, res)=>{

    article.find((error, foundArticles)=>{
         if(error)
         {
             return res.send(error);
         }
         else
         res.send(foundArticles);
    });
 
 })
 
 .post((req,res)=>{

    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle = new article({
        title: req.body.title,
        content: req.body.content

    });

    newArticle.save((error)=>{

        if(!error)
        {
            res.send('post request sent');
        }
        else
        res.send(error);
    });
})

.delete((req, res)=>{

    article.deleteMany((error)=>{

        if(!error)
        {
            return res.send('deleted all articles');
        }
        else 
        return res.send(error)
    })

});

//////////////////////Request targeting a specifc article///////////////////////

app.route('/articles/:specificArticle')

.get((req, res)=>{


    article.findOne({title: req.params.specificArticle}, (error, foundArticle)=>{

        if(error)
        {
            return console.log(error);
        }
        else
        {
             return res.send(foundArticle)
        }
        
    })
})

.put((req, res)=>{

    article.update({title: req.params.specificArticle},
        {title: req.body.title, content: req.body.content},{overwrite:true}, (error, result)=>{

        if(error)
        {
            console.log(error);
           res.send('something went wrong');
        }
        else
        {
            return res.send('successfully updated article');
        }
        
    });

})
