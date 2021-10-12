export default class UserInfo {
    constructor({
        titleProfile,
        infoProfile
    }) {
        this.titleProfile = titleProfile;
        this.infoProfile = infoProfile;
    }

    getUserInfo() {
        return {
            title: this.titleProfile.textContent,
            info: this.infoProfile.textContent
        };
    }

    setUserInfo(data) {
        this.titleProfile.textContent = data.title;
        this.infoProfile.textContent = data.info;
    }
}