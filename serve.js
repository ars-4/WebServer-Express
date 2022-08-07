const { Server } = require('./server');
const fs = require('fs');
let directory = "public";
let port = 80;
let debug = true;


fs.readFile('server.conf', 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        let k;
        let j = 0;
        let tempString = "";
        let l = 0;
        for (let i = 0; i < data.length; i++) {

            if (data[i] === 'r' && data[i + 1] === 'o' && data[i + 2] === 'o' && data[i + 3] === 't') {
                tempString = "";
                j = 0;
                k = i + 5;
                while (data[j + k] !== ";") {
                    tempString += data[j + k];
                    j++;
                }
                directory = tempString.toString();
            } // root


            if (data[i] === 'd' && data[i + 1] === 'e' && data[i + 2] === 'b' && data[i + 3] === 'u') {
                tempString = "";
                j = 0;
                k = i + 6;
                while (data[j + k] !== ";") {
                    tempString += data[j + k];
                    j++;
                }
                debug=tempString;
            } // Debug

            if (data[i] === 'p' && data[i + 1] === 'o' && data[i + 2] === 'r' && data[i + 3] === 't') {
                tempString = "";
                j = 0;
                k = i + 5;
                while (data[j + k] !== ";") {
                    tempString += data[j + k];
                    j++;
                }
                port=tempString
            } // Port

        } // For Loop
    } // Else Statement
    let server = new Server(directory);
    server.runServer(port);
    console.log(`Current settings: \nPort -> ${port}\nDebug Mode -> ${debug}\nRoot Folder -> ${directory}`);
    console.log("Running configurations from \'server.conf\'\n");
}); 

