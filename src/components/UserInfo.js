export default class UserInfo {
constructor(data) {
        this.data = data;
        this.name = document.querySelector(this.data.name);
        this.about = document.querySelector(this.data.about);
        this.avatar = document.querySelector(this.data.avatar);
    }

    getUserInfo() { // объект с данными пользователя
        return {name: this.name.textContent, about: this.about.textContent}
    }

    setUserInfo = (user) => { // новые данные пользователя
        this.name.textContent = user.name;
        this.about.textContent = user.about;
    }

    // setUserAvatar({ avatar }) {
    // this._avatar.src = avatar;
    // }

    // setUserId({ _id }) {
    // this._userId = _id;
    // }

    // getUserId() {
    // return this._userId;
    // }
}
