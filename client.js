$(document).ready(onReady);

function onReady() {
    console.log('jquery');
    $('#submit-btn').on('click', submitEmployee);
    //$('#t-body').on('click', '.delete-btn', rowDelete);
    $('#total-monthly-number').text(totalMonthlySalary);
}

let totalMonthlySalary = 0;



function submitEmployee() {
    console.log('submit clicked');
    let firstName = $('#first-name-input').val();
    let lastName = $('#last-name-input').val();
    let id = $('#id-input').val();
    let title = $('#title-input').val();
    let annualSalary = $('#salary-input').val();
    $('#t-body').append(`
    <tr class="row">
        <td>${firstName}</td>
        <td>${lastName}</td>
        <td>${id}</td>
        <td>${title}</td>
        <td>${'$ ' + numberWithCommas(annualSalary)}</td>
        <td><button class="delete-btn">Delete</button></td>
    </tr >`);
    totalMonthlySalary += annualSalary / 12;
    checkMonthlyTotal(totalMonthlySalary); 
    
    $('#total-monthly-number').text(numberWithCommas(Math.round(totalMonthlySalary)));  
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function checkMonthlyTotal(totalMonthlySalary) {
    if (totalMonthlySalary > 20000) {
        $('#total-monthly-text').css('background-color', 'red');
    }
}


