$(document).ready(onReady);

function onReady() {
    console.log('jquery ready');
    $('#submit-btn').on('click', submitEmployee);
    $('#t-body').on('click', '.delete-btn', rowDelete);
    $('#total-monthly-number').text(numberWithCommas(totalMonthlySalary));
    console.log('Current Employees Array:', employees);
}



// 'Employee' class contructor
class Employee {
    constructor(firstName, lastName, id, title, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = Number(id);
        this.title = title;
        this.annualSalary = Number(annualSalary);
    } //end constructor
};

// Pre-existing employees
let jen = new Employee('Jen', 'Barber', 4521, 'Team Lead', 80000);
let maurice = new Employee('Maurice', 'Moss', 8724, 'Support Team', 58000);
let roy = new Employee('Roy', 'Barber', 9623, 'Team Lead', 80000);

// 'employees' array
let employees = [jen, maurice, roy];

// Starting montly salary from existing employees
let totalMonthlySalary = 15500;




// upon "Submit" button click it appends input info into table row on DOM
function submitEmployee() {
    console.log('submit clicked');
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let id = $('#id-input').val();
    let title = $('#title-input').val();
    let annualSalary = $('#salary-input').val();

    //create new Employee object and push to 'employees' array
    employees.push(new Employee(firstName, lastName, id, title, annualSalary));
    console.log('Current Employees Array:', employees);

    //append new table row on DOM
    $('#t-body').append(`
    <tr class="row">
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td  class="employee-id">${id}</td>
        <td>${title}</td>
        <td>${'$ ' + numberWithCommas(annualSalary)}</td>
        <td class="table-cell-btn"><button class="delete-btn">Delete</button></td>
    </tr >`);

    //calculate 'totalMonthlySalary'
    totalMonthlySalary += annualSalary / 12;

    //run 'checkMonthlyTotal' to verify color of "Total Monthly" background color on DOM
    checkMonthlyTotal(totalMonthlySalary); 
    
    //run function to add commas to number and output to DOM
    $('#total-monthly-number').text(numberWithCommas(Math.round(totalMonthlySalary)));  

    //clear input values on DOM
    $('input').val('');
}




// deletes row of button clicked and updates "Total Monthly:" on DOM
function rowDelete() {

    //set 'deletedSalary' = to "Annual Salary" of deleted employee
    let deletedSalary = $(this).closest('td').prev().text().replace(/\D/g, '');

    let employeeID = $(this).closest('tr').find('.employee-id').text();
    console.log(employeeID);
    
    employeeMatch(employeeID);
    console.log('Current Employees Array:', employees);
    
    //recalculate 'totalMonthlySalary'
    totalMonthlySalary -= deletedSalary/12 

    //remove row from DOM
    $(this).closest('tr').remove();

    //run 'checkMonthlyTotal' to verify color of "Total Monthly" background color on DOM
    checkMonthlyTotal(totalMonthlySalary);

    //run function to add commas to number and output to DOM
    $('#total-monthly-number').text(numberWithCommas(Math.round(totalMonthlySalary)));   
}




// adds commas to 'totalMontlySalary'
function numberWithCommas(totalMonthlySalary) {
    return totalMonthlySalary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}




// checks 'totalMonthlySalary' to update background color on DOM
function checkMonthlyTotal(totalMonthlySalary) {
    if (totalMonthlySalary > 20000) {
        $('#total-monthly-text').css('background-color', '#db00009f');
    }
    else {
        $('#total-monthly-text').css('background-color', 'white');
    }
}




// use 'employeeID' to find match and then delete from 'employees' array
function employeeMatch(employeeID) {
    for (let i = 0; i < employees.length; i++) {   
        if (employeeID == employees[i].id) {
            employees.splice(i, 1);
        }  
    }
    return employees;
}