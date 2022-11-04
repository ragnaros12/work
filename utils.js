import * as PImage from "pureimage";
import fs from "fs";

export class Utils{
    static baseUrl = "https://api.npms.io/v2/";
    static font = PImage.registerFont("./public/microsoftsansserif.ttf", "Font", 700, "", "");

    static buildQuery(url, paramsMap) {
        return this.baseUrl + url + '?' + this.buildParams(paramsMap);
    }

    static buildParams(paramsMap){
        let params = '';
        for (let [key, value] of paramsMap) {
            params += key + '=' + value + '&';
        }
        return params.substr(0, params.length - 1);
    }

    static async generateImage(path, data) {
        await this.font.load(async () => {
            const image = PImage.make(300, 200, {});
            const ctx = image.getContext('2d');
            ctx.font = "20px Font";
            ctx.fillText("Имя: " + data['package']['name'], 10,20);
            ctx.fillText("Версия: " + data['package']['version'], 10,60);

            PImage.encodePNGToStream(image, fs.createWriteStream(path));
        });
    }
}