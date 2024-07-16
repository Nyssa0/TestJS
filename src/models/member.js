class Member {
    constructor(firstName, lastName, email, password) {
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email');
        }
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
}

module.exports = Member;
