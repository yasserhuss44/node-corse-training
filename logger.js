const EventEmitter = require('events');

var url = "http://yasserlogger.io/log"

// function log(message) {
//     console.log(message);
// }


// module.exports.log = log;

class Logger extends EventEmitter {

    log(args) {
        console.log(message);
        this.emit('MessageLogged', message);
    }
}

module.exports.Logger = Logger;