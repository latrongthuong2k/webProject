var body = document.getElementById("body-Control");
var item = body.querySelectorAll('.item');

// tạo sự kiện render từng bảng đối với từng trường dữ liệu khác nhau 


var StudentManagement = [{
    CourseId: 'RA01',
    CourseName: 'Khóa học 1',
    CourseTime: '1000',
    Status: 'Hoạt động',
    Class: []
},
{
    CourseId: 'RA02',
    CourseName: 'Khóa học 2',
    CourseTime: '2000',
    Status: 'Không hoạt động',
    Class: []
}
];
// courses
var course = [
    { CourseId: '', CourseName: '', CourseTime: '', Status: '', Class: [] }
]
// class
var studyClass = [
    {
        ClassId: '', ClassName: '', Descriptions: '', TotalNumber: '', Lecturer: '', Status: '', Students: []
    }
];
// users
var userSystems = [
    {
        userSystem: { email: '', password: '' }
    }
];
// student
var newInformationStudent = {
    studentID: '',
    Birthday: '',
    Name: '',
    Email: '',
    Phone: '',
    Class: '',
    Address: '',
    Status: '',
    Descriptions: '',
    Gender: ''
};


// tạo một function khi chuyển trang sẽ cập nhật vào trong list 
function loadTarget(targetID) {

    switch (targetID) {
        case "Dashboard":
            break;
        case "Course":
            break;
        case "Class":
            break;
        case "Students":
            break;
        case "Users":

            break;
    }
}

// pattern table
// Course
var patternTheadCourse = `<tr>
                            <td>STT</td>
                            <td>Mã Khoá học</td>
                            <td>Tên khóa học</td>
                            <td>Thời gian (giờ)</td>
                            <td>Trạng thái</td>
                            <td style="padding-right: 50px; text-align: center;">Action</td>
                     </tr>`
function patternTbodyCourse(catalog = '', index = '') {
    let data = ` 
          <td>${index + 1}</td>
          <td>${catalog.CourseId}</td>
          <td>${catalog.CourseName}</td>
          <td>${catalog.CourseTime}</td>
          <td>${catalog.Status}</td>
          <td>
        <button class="actionButton" onclick="EditInfo('${catalog.studentID}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="actionButton" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-trash"></i></button>  
          </td>
        `;
    return data;

}
// Class
var patternTheadClass = `<tr>
                            <td>STT</td>
                            <td>Mã lớp</td>
                            <td>Tên lớp</td>
                            <td>Giảng viên</td>
                            <td>Mô tả</td>
                            <td>Sỉ số</td>
                            <td>Trạng thái</td>
                            <td style="padding-right: 50px; text-align: center;">Action</td>
                     </tr>`
function patternTbodyClass(catalog = '', index = '') {
    let data = ` 
          <td>${index + 1}</td>
          <td>${catalog.ClassId}</td>
          <td>${catalog.ClassName}</td>
          <td>${catalog.Lecturer}</td>
          <td>${catalog.TotalNumber}</td>
          <td>${catalog.Status}</td>
          <td>
        <button class="actionButton" onclick="EditInfo('${catalog.studentID}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="actionButton" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-trash"></i></button>  
          </td>
        `;
    return data;
}
// Students
var patternTheadStudents = `<tr>
                            <td>#</td>
                            <td>Id</td>
                            <td>Tên SV</td>
                            <td>Phone</td>
                            <td>Email</td>
                            <td>Giới tính</td>
                            <td>Lớp học</td>
                            <td>Status</td>
                            <td style="padding-right: 80px; ">D/M/Y</td>
                            <td style="padding-right: 50px; text-align: center;">Action</td>
                            </tr>`
function patternTbodyStudents(catalog = '', index = '') {
    let data = `
          <td>${index + 1}</td>
          <td>${catalog.studentID}</td>
          <td>${catalog.Name}</td>
          <td>${catalog.Phone}</td>
          <td>${catalog.Email}</td>
          <td>${catalog.Gender}</td>
          <td>${catalog.Class}</td>
          <td>${catalog.Status}</td>
          <td>${catalog.Birthday}</td>
          <td>
          <button class="actionButton" onclick="EditInfo('${catalog.studentID}')"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="actionButton" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-trash"></i></button>  
            </td>
        `;
    return data;
}
// Users
var patternTheadUser = `<tr>
                            <td>STT</td>
                            <td>Email</td>
                            <td>Mật khẩu</td>
                            <td>Họ và tên</td>
                            <td>Trạng thái</td>
                            <td style="padding-right: 50px; text-align: center;">Action</td>
                     </tr>`
function patternTbodyUser(catalog = '', index = '') {
    let data = ` 
          <td>${index + 1}</td>
          <td>${catalog.email}</td>
          <td>${catalog.password}</td>
          <td>${catalog.userName}</td>
          <td>${catalog.Status}</td>
          <td>
        <button class="actionButton" onclick="EditInfo('${catalog.studentID}')"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="actionButton" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-trash"></i></button>  
          </td>
        `
    return data;
}