const request = require("request");
const fs = require("fs");

const options = {
    url: "https://www.crunchyroll.com/en-gb/a-certain-magical-index/episode-14-heroes-781240",
    headers: {
        Cookie: "_ga=GA1.2.1307886796.1549315073; _fbp=fb.1.1549315073373.549583704; ajs_group_id=null; __qca=P0-1748109036-1549315074373; ajs_anonymous_id=%22d59bde3e-f8b0-4d62-b147-1b37fde30fb8%22; ajs_user_id=%2287292366%22; _gid=GA1.2.414058716.1549729040; amplitude_idundefinedcrunchyroll.com=eyJvcHRPdXQiOmZhbHNlLCJzZXNzaW9uSWQiOm51bGwsImxhc3RFdmVudFRpbWUiOm51bGwsImV2ZW50SWQiOjAsImlkZW50aWZ5SWQiOjAsInNlcXVlbmNlTnVtYmVyIjowfQ==; amplitude_id_f92f25db4ed7f1c7ee55351799d43351crunchyroll.com=eyJkZXZpY2VJZCI6ImMwNDZiMTA4LWYyMTEtNGRjZC1hMDA5LTY3YjUyYjRmMDYxNVIiLCJ1c2VySWQiOiI4NzI5MjM2NiIsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTU0OTgyMjAxMDg2NywibGFzdEV2ZW50VGltZSI6MTU0OTgyMjM0ODUzMywiZXZlbnRJZCI6MzQsImlkZW50aWZ5SWQiOjQ0LCJzZXF1ZW5jZU51bWJlciI6Nzh9"
    }
}

request.get(options, function (error, response, body) {
    if(error) {
        return console.log(error);
    }
    const start = "vilos.config.media = "
    const end = "vilos.config.analytics = "
    const test = body.substring(body.search(start)+start.length, body.search(end)-7);
    let langs = {}
    const streams = JSON.parse(test).streams;
    for(let i in streams) {
        langs[streams[i].hardsub_lang] = streams[i].url
    }
    let req = request(langs["enUS"])
    req.on("response")
}
)