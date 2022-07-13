const inquirer =require('inquirer')
const Choices = require('inquirer/lib/objects/choices.js')
const Engineer = require('./lib/Engineer.js')
const Manager = require('./lib/Manager.js')
const Intern = require('./lib/Intern')
const { writeFile, copyFile } = require('./utils/generate-site')

const generatePage = require('./src/page-template')

const getManagerInfo = () => {
    console.log(`
    ======================================
    Welcome to the team profile generator!
    ======================================
    
    Let's start by getting some information
    about you before we build your team's profile!
    
    `)

    return inquirer.prompt([
        {
            type: 'input',
            message: 'Manager name:',
            name: 'managerName',
            validate: titleInput => {
                if(!titleInput.trim() || typeof titleInput !== 'string') {
                    console.log(`
            Please enter a name!
                    `)
                    return false
                } else {
                    return true
                }
            } 
        },
        {
            type: 'input',
            message: 'Manager ID:',
            name: 'managerId',
            validate: idInput => {
                if(Number.isNaN(parseInt(idInput))) { 
                    console.log(`
            Please enter a numerical ID
                    `)

                    return false
                    
                } else {
                    return true
                    
                }
            }
        },
        {
            type: 'input',
            message: 'Manager email address:',
            name: 'managerEmail',
            validate: emailInput => {
                let isEmail = emailInput.indexOf('@')

                if (isEmail === -1) {
                    console.log(`
            Please enter a valid email address
            `)
                    return false
                } else {
                    return true
                }

            }
        },
        {
            type: 'input',
            message: "Manager's office number:",
            name: 'managerOffice',
            validate: officeInput => {
                if(!officeInput.trim() || typeof officeInput !== 'string') {
                    console.log(`
            Please enter a name!
                    `)
                    return false
                } else {
                    return true
                }
            }
        }
        
    ])
}

const getEmployeeInfo = (teamData) => {

    return inquirer
        .prompt({
                type: 'list',
                message: "What category of employee would you like to add next?",
                name: 'choice',
                choices: ['Engineer', 'Intern', 'Finish building the team']
        })
        .then(({ choice }) => {
            // return the data and exit the function if the user selects the finalize option
            if (choice === 'Finish building the team') {
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
                    message: 'Employee name:',
                    name: 'name',
                    validate: titleInput => {
                        if(!titleInput.trim() || typeof titleInput !== 'string') {
                            console.log(`
            Please enter a name!
                            `)
                            return false
                        } else {
                            return true
                        }
                    }
                },
                {
                    type: 'input',
                    message: 'Employee ID:',
                    name: 'id',
                    validate: idInput => {
                        if(Number.isNaN(parseInt(idInput))) { 
                            console.log(`
            Please enter a numerical ID
                            `)
        
                            return false
                            
                        } else {
                            return true
                            
                        }
                    }
                },
                {
                    type: 'input',
                    message: 'Employee email address:',
                    name: 'email',
                    validate: emailInput => {
                        let isEmail = emailInput.indexOf('@')
        
                        if (isEmail === -1) {
                            console.log(`
            Please enter a valid email address
                `)
                            return false
                        } else {
                            return true
                        }
        
                    }
                },
                {
                    type: 'input',
                    message: "Intern's school:",
                    name: 'school',
                    when: choice === 'Intern',
                    validate: schoolInput => {
                        if(!schoolInput.trim() || typeof schoolInput !== 'string') {
                            console.log(`
            Please enter a school!
                            `)
                            return false
                        } else {
                            return true
                        }
                    }
                },
                {
                    type: 'input',
                    message: "Engineer's github user name:",
                    name: 'github',
                    when: choice === 'Engineer',
                    validate: githubInput => {
                        if(!githubInput.trim() || typeof githubInput !== 'string') {
                            console.log(`
            Please enter a github username!
                            `)
                            return false
                        } else {
                            return true
                        }
                    }
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

    // loop through the employees to create the correct employee objects
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
    // then check the response from our write file function and call copyFile()
    .then(writeFileResponse => {
        console.log(writeFileResponse)
        return copyFile()
    })
    // then check to ensure that copying the css file to the dist directory was successful
    .then(copyFileResponse => {
        console.log(copyFileResponse)
    })
    // catch and log any errors along the way
    .catch(err => {
        console.log(err)
    })
