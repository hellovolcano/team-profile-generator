import inquirer from 'inquirer'

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
        }
    ])
}

const getEmployeeInfo = teamData => {
    console.log(`
    =================
    Add Employee Info
    =================
    `)

    // create an array to store the employee info
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
        type: 'list',
        message: 'Specify the employee category:',
        name: 'type',
        choices: ['Intern','Employee']
    },
    {
        type: 'confirm',
        name: 'confirmAddEmployee',
        message: 'Would you like to add another employee?',
        default: false
    }
 ])
 .then(employeeData => {
    teamData.employees.push(employeeData)
    if(employeeData.confirmAddEmployee) {
        return getEmployeeInfo(teamData)
    } else {
        return teamData
    }
 })


}

getManagerInfo()
    .then(getEmployeeInfo)
    .then(employeeData => {
        console.log(employeeData)
    })