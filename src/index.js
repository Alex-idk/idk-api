const express = require('express');
const app = express();
const config = require('../config.json');
const port = config.port;

// scan files in routes folder and save them in routes array

const routes = [];
const fs = require('fs');
fs.readdirSync('./src/routes').forEach(file => {
    // remove .js from file name
    const route = file.split('.')[0];
    // add the route to routes array
    routes.push(route);
});

// ran every time a get request is made to the server
app.get('/*', (req, res) => {
    // Remove the / from the path
    let path = req.path.replace('/', '');
    // Look into the route and find the type
    let type = require(`./routes/${path}`).type;
    // if the route is in the routes array and the type is get
    if (routes.includes(path) && type == 'get') {
        // run the route
        require(`./routes/${path}`).run(req, res);
    } else {
        // send 404
        res.status(404);
        res.send('404 Not found');
    }
});

// ran every time a post request is made to the server
app.post('/*', (req, res) => {
    // Remove the / from the path
    let path = req.path.replace('/', '');
    // Look into the route and find the type
    let type = require(`./routes/${path}`).type;
    // if the route is in the routes array and the type is post
    if (routes.includes(path) && type == 'post') {
        // run the route
        require(`./routes/${path}`).run(req, res);
    } else {
        // send 404
        res.status(404);
        res.send('404 Not found');
    }
});
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});