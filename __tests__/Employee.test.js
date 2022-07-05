const Employee = require('../lib/Employee')

test('creates a new employee object', () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')

    expect(employee.name).toBe('Valerie')
    expect(employee.id).toBe(1)
    expect(employee.email).toBe('hellovolcano@gmail.com')
})