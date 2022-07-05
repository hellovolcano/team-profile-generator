const Employee = require('../lib/Employee')

test('creates a new employee object', () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')

    expect(employee.name).toBe('Valerie')
    expect(employee.id).toBe(1)
    expect(employee.email).toBe('hellovolcano@gmail.com')
})

test("get's an employee's name", () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')
    const name = employee.getName()

    expect(name).toBe(employee.name)
})

test("gets an employee's ID", () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')
    const id = employee.getId()

    expect(id).toBe(employee.id)

})

test("get's an employee's email address", () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')
    const email = employee.getEmail()

    expect(email).toBe(employee.email)
})

test("get's an employee's role", () => {
    const employee = new Employee('Valerie', 1, 'hellovolcano@gmail.com')
    const role = employee.getRole()

    expect(role).toBe('Employee')
    
})