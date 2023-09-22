export default class UserInfo {
  constructor(name, job, avatar) {
    this.name = document.querySelector(name);
    this.job = document.querySelector(job);
    this.avatar = document.querySelector(avatar);
  }
  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      job: this.job.textContent,
      avatar: this.avatar.src,
    };
    return userInfo;
  }

  setUserInfo(name, job, avatar) {
    this.name.textContent = name;
    this.job.textContent = job;
    this.avatar.src = avatar;
  }
}
