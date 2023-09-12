export default class UserInfo {
    constructor (name,job){
        this.name = document.querySelector(name);
        this.job = document.querySelector(job);
    }
    getUserInfo(){
        const UserInfo = {
            name : this.name,
           job : this.job,
        }
        return UserInfo
   }

    setUserInfo (name,job){
        this.name.textContent = name;
        this.job.textContent = job;
    }
}