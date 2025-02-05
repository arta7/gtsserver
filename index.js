const os = require('os');
const cluster = require('cluster');
const server = require('./server');
const dataBase = require ('./database');
const setConsoleLog  = require('./lib/setConsoleLog');

if (cluster.isMaster) {
    setConsoleLog(`Primary cluster is running on pid:`, process.pid)
    if (process.env.ENVIRONMENT === 'production') {
        for (const _cpu in os.cpus()){
            cluster.fork();
        }
    } else {
        server.start();
        dataBase.sqlConnection();
    }
    
    cluster.on('exit', (worker, code, signal) => {
        setConsoleLog(`Worker died on pid:`, worker.process.pid);
    });
} else {
    server.start();
    dataBase.sqlConnection();
};