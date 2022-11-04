import request from "node-fetch";
export class TelegramApi {

    static users = [1245474530];
    static index = 0;
    static _token = "5458242376:AAEP52WVsg8f4u2yDZWfVoZajIcJZmGrN44";
    static _pool = ["https://vsegda-pomnim.com/uploads/posts/2022-04/1649566296_51-vsegda-pomnim-com-p-derevo-roda-foto-53.jpg",
    "https://dreamcatcherreality.com/wp-content/uploads/2017/11/Bonsai-Tree.jpg",
    "https://demiart.ru/forum/uploads7/post-677270-1296592724.jpg",
    "http://rasfokus.ru/images/photos/medium/322539b3b03db7bbfa784d0b5598aa4c.jpg",
    "https://autogear.ru/misc/i/gallery/23085/1121982.jpg"];

    static _addUserIfNotExists(id) {
        if (this.users.indexOf(id) === -1) {
            this.users.push(id);
        }
    }

    static _sendMessage(text, id) {
        request("https://api.telegram.org/bot" + this._token + "/sendMessage", {
            method: "POST",
            body: JSON.stringify({
                chat_id: id,
                text: text
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
    }

    static workUser(id) {
        this._addUserIfNotExists(id);
        this.index++;
        TelegramApi._sendMessage(this._pool[
            Math.floor(Math.random() * this._pool.length)
            ], id);
    }

    static sendAllMessages(text) {
        for (let user of this.users) {
            this._sendMessage(text, user);
        }
    }

}