const fs = require("fs");
// import { exists } from 'fs';
const path = require("path");
const url = require("url");

exports.getImagesUrl = (req, res, next) => {
    try {
        // Parsing the URL
        const request = url.parse(req.url, true);
        // Extracting the path of file
        const action = request.pathname;
        // Path Refinements
        const filePath = path.join(__dirname,'../assets/images'+action);


        /**
         * fs.exist
         * ---
         * Deprecated: Since v1.0.0 - Use stat or access instead.
         * Since:
         * @version v0.0.2 node
         *
         * @description : The parameters for this callback are not consistent with other Node.js callbacks.
         * Normally, the first parameter to a Node.js callback is an errparameter,
         * optionally followed by other parameters. The fs.exists() callback has only one boolean parameter.
         * This is one reason fs.access() is recommended instead of fs.exists().
         * Using fs.exists() to check for the existence of a file before callingfs.open(),
         * fs.readFile() or fs.writeFile() is not recommended. Doing so introduces a race condition,
         * since other processes may change the file's state between the two calls. Instead,
         * user code should open/read/write the file directly and handle the error raised if the file does not exist.
         *
         * => read (RECOMMENDED)
         */
        fs.open(filePath, 'r', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('file does not exist');
                    return;
                }
                throw err;
            }

            try {
                // Extracting file extension
                const ext = path.extname(action);

                // Setting default Content-Type
                let contentType = "text/plain";

                // Checking if the extension of
                // image is '.png'
                if (ext === ".png") {
                    contentType = "image/png";
                }
                if (ext === ".jpg") {
                    contentType = "image/jpg";
                }

                // Setting the headers
                res.writeHead(200, {
                    "Content-Type": contentType
                });

                // Reading the file
                fs.readFile(filePath,
                    (err, content) => {
                        // Serving the image
                        res.end(content);
                    });
            } finally {
                fs.close(fd, (err) => {
                    if (err) throw err;
                });
            }
        });

    } catch (e) {
        next(e);
    }
}