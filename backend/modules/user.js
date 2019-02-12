module.exports = {
    isAdmin: (user) => {
        if (user.id_profile === 1) {
            return true
        } else {
            return false
        }
    }
}