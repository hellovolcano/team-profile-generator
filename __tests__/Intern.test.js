const Intern = require('../lib/Intern')

test('creates a new intern object', () => {
    const intern = new Intern('Daniel',4,'daniel@email.com','Iowa State')

    expect(intern.name).toBe('Daniel')
    expect(intern.school).toBe('Iowa State')
})

test('gets the school of the intern', () => {
    const intern = new Intern('Daniel',4,'daniel@email.com','Iowa State')
    school = intern.getSchool()

    expect(school).toBe(intern.school)
})