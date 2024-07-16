const Member = require('../../src/models/member');

describe('Member Model', () => {
    test('should create a member with valid inputs', () => {
        const member = new Member('John', 'Doe', 'john.doe@example.com', 'password123');
        expect(member).toBeDefined();
        expect(member.firstName).toBe('John');
        expect(member.lastName).toBe('Doe');
        expect(member.email).toBe('john.doe@example.com');
        expect(member.password).toBe('password123');
    });

    test('should throw an error with invalid email', () => {
        expect(() => {
            new Member('John', 'Doe', 'fakeemail', 'password123');
        }).toThrowError('Invalid email');
    });
});
