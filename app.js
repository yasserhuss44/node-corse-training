// const logger=require('./logger');
// function helloWorld(name)
// {
//    logger.log(name);    
// }
// logger=1;
// helloWorld('Yasser') ;

const os = require('os');

//console.log(os) ;
console.log(os.totalmem());
console.log(os.freemem());

const fs = require('fs');

const files = fs.readdirSync('./');
console.log('Sync', files);


fs.readdir('./', function (err, files) {
    if (err)
        console.log(err);
    else
        console.log('async', files);
});

const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('MessageLogged', function () {
    console.log('Message Logged');
})

emitter.emit('MessageLogged');


emitter.on('MessageWithArg', function (e) {
    console.log('MessageWithArg', e);
})

emitter.emit('MessageWithArg', { Id: 5, Name: 'Yasser' });


const Logger= require('./logger');
const logger= new Logger() ;

logger.on('MessageLoged',(args)=>{
    console.log('Log Event Recieved',args) ;
})

logger.log('Log Yasser') ;