
var currentTarget = JSON.parse(localStorage.getItem('currentTarget')) ? JSON.parse(localStorage.getItem('currentTarget')) : '';

upDateNumberData();

function upDateNumberData() {
    courseList = JSON.parse(localStorage.getItem('courseList')) ? JSON.parse(localStorage.getItem('courseList')) : [];
    classList = JSON.parse(localStorage.getItem('classList')) ? JSON.parse(localStorage.getItem('classList')) : [];
    studentList = JSON.parse(localStorage.getItem('studentList')) ? JSON.parse(localStorage.getItem('studentList')) : [];
    userSystems = JSON.parse(localStorage.getItem('userSystems')) ? JSON.parse(localStorage.getItem('userSystems')) : [];

    var courseTotalNum = courseList.length;
    var studentTotalNum = studentList.length;
    var classTotalNum = classList.length;


    var courseTotal = document.getElementById("courseTotal");
    var classTotal = document.getElementById("classTotal");
    var studentTotal = document.getElementById("studentTotal");

    courseTotal.textContent = courseTotalNum;
    classTotal.textContent = classTotalNum;
    studentTotal.textContent = studentTotalNum;

}
