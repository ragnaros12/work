import express from 'express';
import fetch from "node-fetch";
import path from "path";
import {Utils} from "./utils.js";
import * as fs from 'fs';
import * as Util from "util";


const app = express();
app.use(express.static(path.join(path.resolve(), '/public')));


app.get('/images/:file', async (req, res) => {
    if (!fs.existsSync(path.resolve() + "/images/" + req.params.file)) {
        return res.status(404);
    }
    return res.sendFile(path.resolve() + "/images/" + req.params.file);
});
app.get('/search.html', async (req, res) => {
    if (!req.query.query)
        return res.send("error");
    let query = req.query.query,
        page = req.query.page ? req.query.page : 1;

    if(page < 1){
        page = 1;
    }


    let response = await fetch(Utils.buildQuery(
        'search/',
        new Map([
            ['q', query],
            ['from', page]
        ]))
    );

    let data = (await response.json())['results'];


    let html = "<div style='display: flex; flex-wrap: wrap; flex-direction: row; justify-content: space-around; '>";

    for (const u of data) {
        let path = './images/' + u['package']['name'].replace("@", "").replace("/", "") + '.png';
        await Utils.generateImage(path, u);

        let data = "<div style='border: 1px solid black; flex-direction: column; margin-bottom: 20px; border-radius: 10px; width: 300px; text-align: center'>";
        data += "<div style='font-size: 25px; margin-bottom: 30px; margin-top: 20px'>" + u['package']['name'] + "</div>";
        data += "<div style='font-size: 20px; margin-bottom: 30px; margin-top: 20px'>" + u['package']['description'] + "</div>";
        data += "<div style='font-size: 20px; margin-bottom: 30px; margin-top: 20px'>" + u['package']['links']['npm'] + "</div>";
        data += "<a style='font-size: 20px; margin-bottom: 30px; margin-top: 20px' href='" + path + "'>Линк</a>";
        data += "</div>";

        html += data;
    }


    let prevQ = Utils.buildParams(new Map([
        ["query", query],
        ["page", page - 1]
    ]));
    let nextQ = Utils.buildParams(new Map([
        ["query", query],
        ["page", page + 1]
    ]));
    html += "<a href='search.html?" + prevQ + "'>Прев</a>";
    html += "<a href='search.html?" + nextQ + "'>Некст</a>";




    html += "</div>";
    return res.send(html);
});

app.listen(3000);