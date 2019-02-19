// const http =require('http');


// const server =http.createServer((req,resp)=>{
//     console.log(req) ;
//     resp.write('Hello World') ;
//     resp.end();
// });

// server.listen(3200,function(){
//     console.log('Listining on Port 3200');
// }) ;

const http = require('http');
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const path = require('path');
const app = express();

app.use(cors({
    origin: 'https://codewithmosh.com'
  }));
  
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
    console.log(`Directory Created${dirname}`);

}


app.get('/', cors(), (req, resp) => {
    const videoUrl = req.query.videoUrl;
    const extension = req.query.extension;
    const videoName = req.query.videoName;
    const moduleName = req.query.moduleName;
    const courseName = req.query.courseName;

    var path = require('path'),
        fs = require('fs');

    const url = `./${courseName}/${moduleName}/${videoName}`;
    ensureDirectoryExistence(url);

    const file = fs.createWriteStream(url);

    const request = http.get(videoUrl, function (response) {
    console.log(`Downlading File :${moduleName} => ${videoName}`);

        response.pipe(file);
    });
    console.log(videoUrl);
    resp.send('Hello World');
});

app.listen(3100, () => {
    console.log('listining on port 3100');
});
