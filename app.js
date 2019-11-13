const publicIp = require('public-ip');
const fs = require('fs');

publicIp.v4().then(ip => {
    var newip = ip;
    // var newip = '192.167.12.4'
    logIPChanges(newip)
});

function logIPChanges(newip) {
    if (fs.existsSync('./ip.txt')) {
        fs.readFile('./ip.txt', 'utf8', function(err, contents) {
            if (contents === newip) {
                process.exit()
            } else {
                var loggedip = contents
                DifferentIP(newip, loggedip)
            }
        });
    } else {
        fs.appendFile('ip.txt', newip, function (err) {
            if (err) throw err;
            process.exit()
        });
    }
}

function DifferentIP(newip, loggedip) {
    fs.writeFile('./ip.txt', newip, function (err) {
        if (err) throw err;
        uTorrentCheck(newip)
    });
}

function uTorrentCheck(newip) {
    console.log('ReachedUTorrentCheck')
}