var listAdmins = [
    { email: 'latrongthuong7@gmail.com', password: 'Thuong191020' },
];
var saveUsers = [];

function CheckAdmin(e) {
    e.preventDefault();
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var boxChecks = document.querySelectorAll('.boxCheck');
    listAdmins.forEach(admin => {
        if (admin.email === email && admin.password === password) {
            var newUser = { email: email, password: password };
            saveUsers.push(newUser);
            localStorage.setItem('user', JSON.stringify(saveUsers));
            window.location.href = "./DashBoard/DashBoard.html";
        }
        else if (email === "" && password === "") {
            boxChecks[0].querySelector('p').innerHTML = 'Email không được để trống !'
            boxChecks[1].querySelector('p').innerHTML = 'Pass không được để trống !'
            boxChecks.forEach(box => {
                box.querySelector('div').style.width = '250px'
                box.querySelector('div').classList.remove('hidden');
                box.querySelector('div').classList.add('visible');
            })
        }
        else {
            boxChecks[0].querySelector('p').innerHTML = 'Opp có vẻ sai email rùi !'
            boxChecks[1].querySelector('p').innerHTML = 'Opp có vẻ sai pass rùi !'
            boxChecks.forEach(box => {
                box.querySelector('div').style.width = '200px'
                box.querySelector('div').classList.remove('hidden');
                box.querySelector('div').classList.add('visible');
            })
        }
    });
}
function checkLogin() {
    if (localStorage.getItem('user') == null)
        return;
    var data = JSON.parse(localStorage.getItem('user'));
    if (data != null || data.email === listAdmins.email && data.password === listAdmins.password) {
        window.location.href = "./dashBoard/DashBoard.html";
    }

}
function togglePassword() {
    var password = document.getElementById('password');
    var showPass = document.getElementById('unHindPass');
    if (password.type == "password") {
        password.type = "text";
        showPass.innerHTML = '<i class="fa-regular fa-eye"></i>'
    } else {
        password.type = "password";
        showPass.innerHTML = '<i class="fa-regular fa-eye-slash"></i>'
    }
}

document.getElementById('unHindPass').addEventListener('click', togglePassword)
document.getElementById('submitButton').addEventListener('click', (e) => CheckAdmin(e));
document.getElementById('email').addEventListener('change', (e) => {
    e.preventDefault();
    var boxChecks = document.querySelectorAll('.boxCheck');
    boxChecks.forEach(box => {
        box.querySelector('div').classList.remove('visible');
        box.querySelector('div').classList.add('hidden');
    })
});
document.addEventListener('DOMContentLoaded', () => { checkLogin(); });
