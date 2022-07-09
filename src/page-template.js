const Engineer = require('../lib/Engineer.js')
const Manager = require('../lib/Manager.js')
const Intern = require('../lib/Intern')

// create the cards
const buildEmployeeCard = arr => {
    let employeeCards = ''

    arr.forEach(employee => {
        
        const name = employee.getName()
        const role = employee.getRole()
        const id = employee.getId()
        const email = employee.getEmail()
        console.log(name,role,id,email)


        let cardHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-subtitle">${role}</h3>
                <ul class="list-group">
                    <li class="list-group-item">Employee ID: ${id}</li>
                    <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                    ${addRoleSpecificInfo(employee)}
                </ul>
            </div>
        </div>

        `
        employeeCards += cardHTML    
    })

    return employeeCards
}

const addRoleSpecificInfo = employee => {
    if(employee instanceof Manager) {
        const office = employee.getOffice()
        return `<li class="list-group-item">Office: ${office}</li>`
    } else if (employee instanceof Intern) {
        const school = employee.getSchool()
        return `<li class="list-group-item">School: ${school}</li>`
    } else if (employee instanceof Engineer) {
        const github = employee.getGithub()
        return `<li class="list-group-item">Github: <a href="https://www.github.com/${github}" target="_blank">${github}</a></li>`
    }
}

// loop through and create the employee cards

module.exports = array => {
    console.log("In the page-template js file: ")
    console.log(array.length)
    console.log(array[0])

    // const { employees, ...manager} = teamData
    // console.log(employees)

    return `
        <!DOCTYPE html> 
        <html lang="en"> 

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My Team</title>
            <!-- CSS only -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css">
        </head>
        <body>
            <header>
                <h1>My Team</h1>
            </header>
            <section>
                ${buildEmployeeCard(array)}
            </section>
        </body>
        </html>
        `
}