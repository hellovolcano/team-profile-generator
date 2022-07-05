const Manager = require('../lib/Manager')

test('creates a new manager object', () => {
    const manager = new Manager('Brian', 2, 'brian@hello.com', '2A')

    expect(manager.name).toBe('Brian')
    expect(manager.id).toBe(2)
    expect(manager.email).toBe('brian@hello.com')
    expect(manager.office).toBe('2A')
})

test("returns the manager's role", () => {
    const manager = new Manager('Brian', 2, 'brian@hello.com', '2A')
    const role = manager.getRole()

    expect(role).toBe('Manager')
})