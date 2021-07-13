const state = {
    loggedIn: false,
    id: "",
    nickname: "",
    avatarPath: "",
    realName: ""
}

const getters = {
    userInfo: (state) => {
        return {
            name: state.nickname,
            avatar: state.avatarPath,
            id: state.id,
        }
    },
}

const mutations = {
    userLogin(state, user) {
        state.loggedIn = true
        state.id = user.SchoolId
        state.nickname = user.NickName
        state.avatarPath = user.avatarPath
        state.realName = user.RealName
    },

    userLogout(state) {
        state.loggedIn = false
        state.id = ""
        state.nickname = ""
        state.avatarPath = ""
        state.realName = ""
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations
}

