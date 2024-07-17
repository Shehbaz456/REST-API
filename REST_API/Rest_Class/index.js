const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override"); 

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

let posts = [
    {
        id:uuidv4(),
        username:"Shehbaz",
        postTitle:"How can I generate ideas for blogging?",
        content:"If you’re like most people who start a blog, you initially have a bit of writer’s block. Good news - it will likely go away, and you’ll find yourself thinking of new things to blog about frequently. In fact blogging becomes quite addictive."
    },
    {
        id:uuidv4(),
        username:"Ultimo",
        postTitle:"How can I generate ideas for blogging?",
        content:"Supprim leader Technology"
    },
    {
        id:uuidv4(),
        username:"Dildar",
        postTitle:"How can I generate ideas for blogging?",
        content:"I got selected for job"
    },

];

app.get("/",(req,res,next)=>{
    res.redirect("/posts");
})
app.get("/posts",(req,res,next)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})
app.post("/posts",(req,res)=>{
    let {username,postTitle,content} =  req.body;
    let id = uuidv4();
    posts.push({id,username,postTitle,content});
    res.redirect("./posts");
})

app.get("/posts/:id", async(req,res)=>{
    let {id} = req.params;
    let post = await posts.find((p)=>id === p.id);
    console.log(post);
    res.render("show.ejs",{post});
})

app.patch("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = await posts.find((p)=>id === p.id);
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts")
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id === p.id);
    console.log(post);
    res.render("edit.ejs",{post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts")
})

app.listen(port,()=>{
    console.log(`Active port ${port}`);
})


