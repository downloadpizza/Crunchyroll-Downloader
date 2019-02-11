const request = require("request");
const { spawn } = require('child_process');


const options = {
    url: "https://www.crunchyroll.com/en-gb/a-certain-magical-index/episode-14-heroes-781240",
    headers: {}
};

request.get(options, function (error, response, body) {
    if(error) {
        return console.log(error);
    }
    const start = "vilos.config.media = ";
    const end = "vilos.config.analytics = ";
    console.log(body.search(start))
    console.log(body.search(end))
    const test = body.substring(body.search(start)+start.length, body.search(end)-7);
    let langs = {}
    const meta = JSON.parse(test);
    const streams = meta.streams;
    for(let i in streams) {
        langs[streams[i].hardsub_lang] = streams[i].url
    }
    console.log(langs["enUS"]);
    getStream(langs["enUS"])
})

function getStream(url) {
    let ffmpeg = spawn("ffmpeg", ['-i', url, '-c','copy', 'live.mkv']);
    ffmpeg.stdout.on('data', (data) => {
        console.log(data);
    });

    ffmpeg.stderr.on('data', (data) => {
        console.log(data);
    });

    ffmpeg.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}



