const request = require("request");
const { spawn } = require('child_process');
const fs = require('fs');

main();

function main() {
    if(process.argv.length < 3) {
        console.log('Usage: crunchy [url]');
    } else {
        download(process.argv[2]);
    }
}

function download(url) {
    const options = {
        url: url,
        headers: {}
    };
    const outname = url.replace(/https?:\/\/.+\..+\/[a-z]+-[a-z]+\//, "").replace(/[^a-zA-Z0-9]/g, "_")+'.mkv';
    console.log(outname);

    request.get(options, function (error, response, body) {
        if (error) {
            return console.log(error);
        }
        const start = "vilos.config.media = ";
        const end = "vilos.config.analytics = ";
        if(body.search(start)==-1 || body.search(end)==-1) {
            console.log('error');
            return
        }
        const test = body.substring(body.search(start) + start.length, body.search(end) - 7);
        let langs = {};
        const meta = JSON.parse(test);
        const streams = meta.streams;
        for (let i in streams) {
            langs[streams[i].hardsub_lang] = streams[i].url
        }
        if (fs.existsSync(outname)) {
            fs.unlinkSync(outname);
        }
        getStream(langs["enUS"])
    });

    function getStream(url) {
        let ffmpeg = spawn("ffmpeg", ['-hide_banner', '-v', 'quiet', '-stats', '-i', url, '-c', 'copy', outname]);
        ffmpeg.stdout.on('data', (data) => {
            console.log(`${data}`);
        });

        ffmpeg.stderr.on('data', (data) => {
            console.log(`${data}`);
        });

        ffmpeg.on('close', (code) => {
            console.log(`ffmpeg exited with code ${code}`);
        });
    }
}