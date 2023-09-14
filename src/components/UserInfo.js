export default class UserInfo {
  constructor(name, job) {
    this.name = document.querySelector(name);
    this.job = document.querySelector(job);
  }
  getUserInfo() {
    const userInfo = {
      name: this.name.textContent,
      job: this.job.textContent,
    };
    return userInfo;
  }

  setUserInfo(name, job) {
    this.name.textContent = name;
    this.job.textContent = job;
    console.log(name);
    console.log(job);
  }
}
