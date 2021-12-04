export default class UserInfo {
    constructor({
        titleProfile,
        infoProfile,
        avatarProfile
    }) {
        this.titleProfile = titleProfile;
        this.infoProfile = infoProfile;
        this.avatarProfile = avatarProfile;
    }

    getUserInfo() {
        return {
            name: this.titleProfile.textContent,
            about: this.infoProfile.textContent
        };
    }

    setUserInfo(data) {
        if ({ data }) {
            this.titleProfile.textContent = data.name;
            this.infoProfile.textContent = data.about;
            this.avatarProfile.src = data.avatar;
        } else {
            console.log('Что-то пошло не так...')
        }
    }

}