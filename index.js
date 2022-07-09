const inquirer =require('inquirer')
const Choices = require('inquirer/lib/objects/choices.js')
const Engineer = require('./lib/Engineer.js')
const Manager = require('./lib/Manager.js')
const Intern = require('./lib/Intern')
const writeFile = require('./utils/generate-site')

const generatePage = require('./src/page-template')

const getManagerInfo = () => {

    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the team manager:',
            name: 'managerName',
        },
        {
            type: 'input',
            message: 'Enter the employee ID',
            name: 'managerId'
        },
        {
            type: 'input',
            message: 'Enter the email address for the employee:',
            name: 'managerEmail'
        },
        {
            type: 'input',
            message: 'What is your office number?',
            name: 'managerOffice'
        }
        
    ])
}

const getEmployeeInfo = (teamData) => {

    return inquirer
        .prompt({
                type: 'list',
                message: "What type of employee would you like to add next?",
                name: 'choice',
                choices: ['Engineer', 'Intern', 'Finalize the team']
        })
        .then(({ choice }) => {
            // return the data and exit the function if the user selects the finalize option
            if (choice === 'Finalize the team') {
                return teamData
            }

            // create an array to store the employee info if it doesn't exist yet
            if(!teamData.employees) {
                teamData.employees = []
            }
    
            return inquirer
                .prompt([
                {
                    type: 'input',
                    message: 'Enter the name of the employee:',
                    name: 'name',
                },
                {
                    type: 'input',
                    message: 'Enter the employee ID',
                    name: 'id'
                },
                {
                    type: 'input',
                    message: 'Enter the email address for the employee:',
                    name: 'email'
                },
                {
                    type: 'input',
                    message: 'Enter the university this intern attends:',
                    name: 'school',
                    when: choice === 'Intern'
                },
                {
                    type: 'input',
                    message: 'Enter the github user name for the engineer:',
                    name: 'github',
                    when: choice === 'Engineer'
                }
            ])
            // add the employee type to the object and then push to the employees array
            .then(employeeData => {
                employeeData.type = choice
                teamData.employees.push(employeeData)

                // Call the function again to display the manager action menu
                return getEmployeeInfo(teamData)
            })
        })

}

const createEmployeeObjects = teamData => {
    const employeeArr = []
    const manager = new Manager(teamData.managerName, teamData.managerId, teamData.managerEmail, teamData.managerOffice)

    // push the manager obj to the array
    employeeArr.push(manager)

    // loop through the employees to create the employee objects
    let person = ''
    teamData.employees.forEach(employee => {
        if (employee.type === 'Intern') {
            person = new Intern(employee.name, employee.id, employee.email, employee.school)
        } else {
            person = new Engineer(employee.name, employee.id, employee.email, employee.github)
        }

        // push the employee to the array
        employeeArr.push(person)
    })

    return employeeArr
}

// Start with a call to get the information about the manager
getManagerInfo()
    // then get the information about the employees
    .then(getEmployeeInfo)
    // then process that data into their respective classes
    .then(teamData => {
        return createEmployeeObjects(teamData)
    })
    // then send it to the generate page function to build the HTML we need
    .then(employeeArr => {
        return generatePage(employeeArr)
    })
    // then write what's returned from the generatePage function to an HTML file
    .then(pageHTML => {
        return writeFile(pageHTML)
    })
