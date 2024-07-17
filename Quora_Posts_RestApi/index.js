const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
let methodOverride = require('method-override')

app.use(express.urlencoded({extended:true}));
app.use(express.json())

// override with POST having ?_method=DELETE,PATCH
app.use(methodOverride('_method'))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
console.log(__dirname);
console.log(path.join(__dirname,"public"));



let posts = [
    {
        id:uuidv4(),
        username:"Shehbaz",
        title:"How can I generate ideas for blogging?",
        content:"If you’re like most people who start a blog, you initially have a bit of writer’s block. Good news - it will likely go away, and you’ll find yourself thinking of new things to blog about frequently. In fact blogging becomes quite addictive."
    },
    {
        id:uuidv4(),
        username:"Ultimo",
        title:"How can I generate ideas for blogging?",
        content:"Supprim leader Technology"
    },
    {
        id:uuidv4(),
        username:"Ultimo",
        title:"How can I generate ideas for blogging?",
        content:"I got selected for job"
    }
]



app.get('/',function(req,res){
    res.redirect("/posts")
})
app.get('/posts',function(req,res){
    res.render("index",{posts});
})

//Show Create Post form
app.get('/posts/new',function(req,res){
    res.render("new");
})
//Save Create Post form
app.post('/posts',function(req,res){
    let {username,title,content} = req.body
    let id = uuidv4()
    posts.push({id,username,title,content})
    res.render("index",{posts});
})


app.get('/posts/:id',function(req,res,next){
    let {id} = req.params
    let flag = true 
    let post = posts.find((p)=> (id == p.id)? flag=true:flag=false)
    if (flag==true) {
    res.render("show",{post})   
    }else{
        res.render("error")
    }
    console.log(post);
})

app.patch('/posts/:id',function(req,res,){
    let {id} = req.params
    let newContent = req.body.content
    let post = posts.find((p)=> (id == p.id))
    post.content =newContent
    console.log(newContent);
    res.redirect("/posts");
})
app.get('/posts/:id/edit',function(req,res,){
    let {id }= req.params
    let post = posts.find((p)=> (id === p.id))
    res.render("edit",{post});
})
app.delete('/posts/:id',function(req,res,){
    let {id }= req.params
    posts =  posts.filter((p)=>id !== p.id)
    res.redirect("/posts");
})

app.get('*',function(req,res){
    res.render("error")
})


app.listen(port,()=>{
    console.log("Active port on ",port);
})