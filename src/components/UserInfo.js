export default class UserInfo {
  constructor ({name, info}) {
    this._name = name;
    this._info = info;
  }

  getUserInfo () { // объект с данными пользователя
    const data = {}
    data.name = this._name.textContent;
    data.info = this._info.textContent;
    return data;
  }

  setUserInfo = (user) => { // новые данные пользователя
    this._name.textContent = user.username;
    this._info.textContent = user.userjob;
  }

}
