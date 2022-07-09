const inquirer =require('inquirer')
const Choices = require('inquirer/lib/objects/choices.js')
const Manager = require('./lib/Manager.js')
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

getManagerInfo()
    .then(getEmployeeInfo)
    .then(teamData => {
        return generatePage(teamData)
        }
)