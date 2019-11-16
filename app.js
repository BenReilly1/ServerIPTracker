const publicIp = require('public-ip');
const fs = require('fs');
const find = require('find-process');
const axios = require('axios')
const config = require('./config')
const Nexmo = require('nexmo');


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
    find('name', 'uTorrent', true)
    .then(function (list) {
        if (list[0] === undefined) {
            var running = false
            balanceCalc(newip, running)
        } else {
            var running = true
            balanceCalc(newip, running)
        }
    });
}

function balanceCalc(newip, running) {
    axios.get('https://rest.nexmo.com/account/get-balance?api_key='+ config.apiKey + '&api_secret=' + config.apiSecret)
    .then(response => {
        console.log(response.data.value)
        const virginBal = response.data.value
        const changedBal = virginBal - 0.03;
        const remainingBalance = changedBal.toFixed(2)
        SmsText(newip, running, remainingBalance)
    })
    .catch(error => {
        console.log(error)
    })
}

function SmsText(newip, running, remainingBalance) {
    const nexmo = new Nexmo({
    	apiKey: config.apiKey,
	    apiSecret: config.apiSecret,
    });
    if (running) {
        const text = 'Server is on ' + newip + '. UTorrent is running! Remaining Balance is ' + remainingBalance;
        nexmo.message.sendSms(config.sendFrom, config.sendTo, text);
    } else {
        const text = 'Server is on ' + newip + '. No uTorrent running! Remaining Balance is ' + remainingBalance;
        nexmo.message.sendSms(config.sendFrom, config.sendTo, text);
    }
}