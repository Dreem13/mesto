export default class UserInfo {
constructor(data) {
        this.data = data;
        this.name = document.querySelector(this.data.name);
        this.about = document.querySelector(this.data.about);
        this.avatar = document.querySelector(this.data.avatar);
    }

    getUserInfo() { // объект с данными пользователя
        return {name: this.name.textContent, about: this.about.textContent, avatar: this.avatar.value}
    }

    setUserInfo = (user) => { // новые данные пользователя
        if (user.name, user.about, user.avatar) {
        this.name.textContent = user.name;
        this.about.textContent = user.about;
        this.avatar.src = user.avatar;
        }
      }

    setUserAvatar(avatar) {
    this.avatar.src = avatar;
    console.log(avatar)
    }

    // setUserId({ id }) {
    // this.userId = id;
    // }

    // getUserId() {
    // return this.userId;
    // }
}
