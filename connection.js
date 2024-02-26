const net = require('net');

function checkServerConnection(host, port, callback) {
    const socket = new net.Socket();
    
    socket.setTimeout(2000); // Set a timeout for the connection attempt

    socket.on('connect', () => {
        socket.end(); // Close the socket once connected
        callback(null, true); // Connection successful
    });

    socket.on('timeout', () => {
        socket.destroy(); // Destroy the socket if connection times out
        callback(new Error('Connection timed out'), false);
    });

    socket.on('error', (err) => {
        callback(err, false); // Error occurred, unable to connect
    });

    socket.connect(port, host); // Attempt to connect to the server
}

// Usage example
const serverHost = 'example.com';
const serverPort = 80;

checkServerConnection(serverHost, serverPort, (error, isConnected) => {
    if (error) {
        console.error('Error:', error.message);
    } else {
        if (isConnected) {
            console.log(`Connection to ${serverHost}:${serverPort} successful.`);
        } else {
            console.log(`Unable to connect to ${serverHost}:${serverPort}.`);
        }
    }
});
