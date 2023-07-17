
var currentTarget = JSON.parse(localStorage.getItem('currentTarget')) ? JSON.parse(localStorage.getItem('currentTarget')) : '';

upDateNumberData();

function upDateNumberData() {
    courseList = JSON.parse(localStorage.getItem('courseList')) ? JSON.parse(localStorage.getItem('courseList')) : [];
    classList = JSON.parse(localStorage.getItem('classList')) ? JSON.parse(localStorage.getItem('classList')) : [];
    studentList = JSON.parse(localStorage.getItem('studentList')) ? JSON.parse(localStorage.getItem('studentList')) : [];
    userSystems = JSON.parse(localStorage.getItem('userSystems')) ? JSON.parse(localStorage.getItem('userSystems')) : [];

    // 
    var courseTotalNum = courseList.length;
    // 
    var studentTotalNum = studentList.length;
    var studentStudying = 0;
    var studentWaiting = 0;
    var studentBan = 0;
    var graduateTotal = 0;

    studentList.forEach(student => {
        if (student.Status == 'Đang học')
            studentStudying++;
        else if (student.Status == 'Bảo lưu' && student.Status == 'Đình chỉ')
            studentBan++;
        else if (student.Status == 'Chờ lớp')
            studentWaiting++;
        else if (student.Status == 'Tốt nghiệp')
            graduateTotal++;
    });


    // 
    var classTotalNum = classList.length;
    var activeClass = 0;
    var endedClass = 0;
    var waitingClass = 0;

    classList.forEach(classObjs => {
        if (classObjs.Status == 'Chờ lớp')
            waitingClass++;
        if (classObjs.Status == 'Kết thúc')
            endedClass++;
        if (classObjs.Status == 'Hoạt động')
            activeClass++;

    });


    var courseTotal = document.getElementById("courseTotal");
    courseTotal.textContent = courseTotalNum;

    var classTotal = document.getElementById("classTotal");
    var activeClass = document.getElementById("activeClass");
    var inactiveClass = document.getElementById("inactiveClass");
    var NumberTotal = document.getElementById("NumberTotal");
    classTotal.textContent = classTotalNum;






    var studentTotal = document.getElementById("studentTotal");
    var studentWaiting = document.getElementById("studentWaiting");
    var activeStudent = document.getElementById("activeStudent");
    var inactiveStudent = document.getElementById("inactiveStudent");
    var graduated = document.getElementById("graduated");
    studentTotal.textContent = studentTotalNum;




}
