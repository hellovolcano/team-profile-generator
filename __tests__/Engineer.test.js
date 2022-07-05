const Engineer = require('../lib/Engineer')

test('creates a new engineer object', () => {
    const engineer = new Engineer('Roscoe', 3, 'roscoe@email.com', 'roscoevolcano')

    expect(engineer.name).toBe('Roscoe')
    expect(engineer.id).toBe(3)
    expect(engineer.email).toBe('roscoe@email.com')
    expect(engineer.github).toBe('roscoevolcano')
})

test('gets the github user name for the engineer', () => {
    const engineer = new Engineer('Roscoe',3,'roscoe@email.com','roscoevolcano')
    const github = engineer.getGithub()

    expect(github).toBe(engineer.github)
})

test('gets the role of the engineer', () => {
    const engineer = new Engineer('Roscoe',3,'roscoe@email.com','roscoevolcano')
    const role = engineer.getRole()

    expect(role).toBe('Engineer')
})