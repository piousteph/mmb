
module.exports = {
    isAdmin: (user) => {
        jUser = user.toJSON();
        if (jUser.id_profile === 1) {
            return true
        } else {
            return false
        }
    }
}