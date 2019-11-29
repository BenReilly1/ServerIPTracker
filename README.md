Tracks IPv4 address of server and sends a SMS message regarding status.
If IP address has changed then it will send a text message showing if the process is running.

Setup,
Create a config.js file which has this code:
module.exports = {
    apiKey: '', // Enter Nexmo API Key
    apiSecret: '', // Enter Nexmo Secret Key
    sendFrom: 'IPLogger', // Leave this the same or change
    sendTo: '' // Enter your phone number
}

Make a new task schedule in Windows 10, set the trigger to run repeatedly after X amount of time indefinately.
Make the action to start a program, the program/script should point to your NodeJS install location and add the Arguments pointing to the app.js file from the git clone.
