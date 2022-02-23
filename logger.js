const winston = require('winston');
const level = require('./level');

const {
    createLogger,
    format,
    transports
} = require('winston');

const {
    combine,
    timestamp,
    label,
    prettyPrint
} = format;

const logger = createLogger({
    format: combine(
        label({
            label: 'right meow!'
        }),
        timestamp(),
        prettyPrint()
    ),
    transports: [new transports.Console(),
        new winston.transports.File({
            filename: './logs/error.log',
            level: 'error',
            maxsize: '10000000',
            maxFiles: '3'
        }),
        new winston.transports.File({
            filename: './logs/info.log',
            level: 'info',
            maxsize: '10000000',
            maxFiles: '3'
        }),
        new winston.transports.File({
            filename: './logs/debug.log',
            level: 'debug',
            maxsize: '10000000',
            maxFiles: '3'
        })
    ]
})

const info = (msg) => {
    logger.log({
        level: 'info',
        message: msg
    });
    console.info(msg);
}

const warn = (msg) => {
    logger.log({
        level: 'warn',
        message: msg
    });
    console.warn(msg);
}

const debug = (msg) => {
    logger.log({
        level: 'debug',
        message: msg
    });
    console.debug(msg);
}
const error = (msg) => {
    logger.log({
        level: 'error',
        message: 'error'
    });
    console.error(msg);
}

process.on('uncaughtException', function (error) {
    logger.log({
        level: 'error',
        message: 'uncaughtException error' + error
    });
});
// info();
// debug();
// error();

module.exports = {
    info,
    debug,
    error,
    warn
};