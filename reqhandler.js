'use strict';
const http = require('http');
const url = require('url');
var data = {
	"JavaScript": "JavaScript is a cross-platform, object-oriented scripting language. It is a small and lightweight language. Inside a host environment (for example, a web browser), JavaScript can be connected to the objects of its environment to provide programmatic control over them.",

	"jQuery": "jQuery is a fast, small, and feature-rich JavaScript library. It makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.",

	"AngularJS": "AngularJS is a structural framework for dynamic web apps. It lets you use HTML as your template language and lets you extend HTML's syntax to express your application's components clearly and succinctly. AngularJS's data binding and dependency injection eliminate much of the code you would otherwise have to write.",

	"NodeJS": "Node.js is a platform built on Chrome's JavaScript runtime for easily building fast and scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."
}

function router(req, res) {
    let uri = url.parse(req.url, true);
    if(data.hasOwnProperty(uri.query.content)){
        res.writeHead(200,{'Content-type': 'application/json','Access-Control-Allow-Origin': '*'});
        let a ={};
        a[uri.query.content]= data[uri.query.content];
        res.end(JSON.stringify(a));
    }
    else
        res.writeHead(404);
}

http.createServer(router).listen(3000, () => {
    console.log('Server running on port 3000')
})