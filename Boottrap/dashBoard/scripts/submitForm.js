


// check đầu vào
function checkInput() {
    const inputGlobalClassList = document.querySelectorAll('[type="text"]');
    inputGlobalClassList.forEach(element => {
        element.addEventListener('blur', (e) => {
            e.preventDefault();
            switch (currentTarget) {
                case 'courseList':
                    checkInputCourse(element, 'checkEach');
                    break;
                case 'studentList':
                    checkInputStudent(element, 'checkEach');
                    break;
                case 'classList':
                    checkInputClass(element, 'checkEach');
                    break;
            }
        });
    });
}
// take Value and reset
function submitForm(action, targetList = []) {
    var validFeelBackGlobal = document.querySelectorAll('.valid-feedback');
    var inValidFeelBackGlobal = document.querySelectorAll('.invalid-feedback');
    var inputGlobalClass = document.querySelectorAll('[type="text"]');
    var selectedStatus = document.getElementById('selectStatus');
    if (action === 'submit') {
        switch (currentTarget) {
            case COURSE_TARGET:
                inputGlobalClass.forEach(element => {
                    // check each để lấy dữ liệu
                    checkInputCourse(element, 'checkEach');
                });
                if (func(selectedStatus) == false) {
                    return;
                }

                course.Status = selectedStatus.value;

                pushOrModify(course, 'CourseId');;
                break;
            case CLASS_TARGET:
                var Descriptions = document.getElementById('descriptions');
                var LecturerName = document.getElementById('LecturerName');
                inputGlobalClass.forEach(element => {
                    checkInputClass(element, 'checkEach');
                })
                if (func(selectedStatus) === false) {
                    break;
                }
                classRoom.Lecturer = LecturerName.value;
                classRoom.Status = selectedStatus.value;
                classRoom.Descriptions = Descriptions.value;
                pushOrModify(classRoom, 'ClassId');
                break;
            case STUDENT_TARGET:
                var gender = document.querySelector('input[name="gender"]:checked').value;
                //
                inputGlobalClass.forEach(element => {
                    if (element.id !== 'descriptions' || element.id !== 'gender') {
                        // check each để lấy dữ liệu
                        checkInputStudent(element, 'checkEach');
                    }
                });
                //
                if (func(selectedStatus) === false) {
                    break;
                }
                // ********* lấy NỐT dữ liệu gender vs descriptions riêng ( không có trong hàm CheckInput ) *********
                newInformationStudent.Descriptions = descriptions;
                newInformationStudent.Gender = gender;
                newInformationStudent.Status = selectedStatus.value;

                pushOrModify(newInformationStudent, 'studentID');

                break;
            case USER_TARGET:
                break;
        }
        // // vatidate trường Status ( đổi màu đỏ nếu không chọn )
        function func(selectedStatus) {
            if (selectedStatus.value == '') {
                selectedStatus.style.borderColor = '#dc3545';
                selectedStatus.style.boxShadow = ' 0px 0px 4px 2px rgba(255, 35, 35, 0.5)';
                selectedStatus.addEventListener('change', function () {
                    if (selectedStatus.value === '') {
                        selectedStatus.style.borderColor = '#dc3545';
                        selectedStatus.style.boxShadow = '  0px 0px 4px 2px rgba(255, 35, 35, 0.5)';
                    }
                    else {
                        selectedStatus.style.borderColor = '#198754';
                        selectedStatus.style.boxShadow = '  0px 0px 4px 2px #19875466';
                    }
                })
                return false; // return nếu status chưa được chọn
            }
        }
        // Reset trạng thái ẩn cảnh báo cho tất cả các trường
        for (var i = 0; i < validFeelBackGlobal.length; i++) {
            validFeelBackGlobal[i].style.display = 'none';
        }
        for (var i = 0; i < inValidFeelBackGlobal.length; i++) {
            inValidFeelBackGlobal[i].style.display = 'none';
        }
        for (var i = 0; i < inputGlobalClass.length; i++) {
            inputGlobalClass[i].classList.remove('is-valid');
            inputGlobalClass[i].classList.remove('is-invalid');
        }
        document.querySelector('#addForm').reset();
        //**** Lưu giá trị vào mảng
        // check trước là sửa hay push mới 
        function pushOrModify(patternObject, targetId) {
            if (document.getElementById(targetId).readOnly === true) {
                document.getElementById(targetId).readOnly = false;
                CheckExistToOverride(targetList, patternObject);
            } else {
                targetList.push(patternObject);
                localStorage.setItem(currentTarget, JSON.stringify(targetList));
            }
        }
        //  làm các việc còn lại
        renderCatalogs(targetList);
        popOutForm();

    } else if (action === 'close') {
        // Reset trạng thái ẩn cảnh báo cho tất cả các trường
        for (var i = 0; i < validFeelBackGlobal.length; i++) {
            validFeelBackGlobal[i].style.display = 'none';
        }
        for (var i = 0; i < inValidFeelBackGlobal.length; i++) {
            inValidFeelBackGlobal[i].style.display = 'none';
        }
        for (var i = 0; i < inputGlobalClass.length; i++) {
            inputGlobalClass[i].classList.remove('is-valid');
            inputGlobalClass[i].classList.remove('is-invalid');
        }
        document.querySelector('#addForm').reset();
        popOutForm();
    }
};

// addEvent blur cho inputs
checkInput();