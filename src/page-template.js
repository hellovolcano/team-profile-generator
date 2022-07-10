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
        <div class="card m-3">
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <h3 class="card-subtitle text-muted">${addRoleIcons(employee)} ${role}</h3>
            </div>
            <ul class="list-group m-3">
                <li class="list-group-item">Employee ID: ${id}</li>
                <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
                ${addRoleSpecificInfo(employee)}
            </ul>
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

const addRoleIcons = employee => {
 
    if(employee instanceof Manager) {
        return `<i class="bi bi-cup"></i>  `
    } else if (employee instanceof Intern) {
        return `<i class="bi bi-mortarboard"></i>  `
    } else if (employee instanceof Engineer) {
        return `<i class="bi bi-eyeglasses"></i>  `
    }
    
}

// loop through and create the employee cards

module.exports = array => {

    return `
        <!DOCTYPE html> 
        <html lang="en"> 

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>My Team</title>
            <!-- Bootstrap  -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.3/font/bootstrap-icons.css">
            <!-- Google fonts -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@100;900&display=swap" rel="stylesheet">
            <!-- Custom Stylesheet -->
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            <header>
                <h1 class="text-center">My Team</h1>
            </header>
            <section class="d-flex flex-row flex-wrap justify-content-evenly mx-auto" style="width: 80%;">
                ${buildEmployeeCard(array)}
            </section>
        </body>
        </html>
        `
}