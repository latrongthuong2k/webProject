// *** sử lý Animation BG màu tối cho cái form
document.addEventListener("DOMContentLoaded", function () {
    // Cài đặt ban đầu cho các nút Navigator
    var bodyControl = document.querySelector("#body-Control");
    var items = bodyControl.querySelectorAll(".item");
    var itemsIcons = bodyControl.querySelectorAll(".item .customIcon")
    items.forEach(item => {
        item.addEventListener("click", () => {
            items.forEach(button => {
                button.style.backgroundColor = '';
                button.style.boxShadow = '';

            });
            item.style.backgroundColor = 'rgba(80, 156, 219, 1)';
            item.style.boxShadow = '0px 0px 40px 0px rgba(0, 0, 0, 0.4)';

            // icon
            itemsIcons.forEach(button => {
                button.style.visibility = 'hidden';
            });
            var icon = item.querySelector(".customIcon");
            icon.style.visibility = 'visible';
        });
    });
    // cài đặt ban đầu cho trường feel back
    var feedbacks = document.querySelectorAll('.feelBack');
    feedbacks.forEach(div => {
        div.innerHTML = '';
        var feedback = `
                            <div class="valid-feedback">
                                        Ok rồi đó!
                            </div>
                            <div class="invalid-feedback">
                                        Không OK!
                            </div>`;
        div = feedback;
    });
    // cài đặt ban đầu cho trường Input nếu đối tượng là Student
    const inputGlobalClassList = document.querySelectorAll('[type="text"]');
    inputGlobalClassList.forEach(element => {
        if (element.id !== 'descriptions' && element.id !== 'gender') {
            element.addEventListener('blur', (e) => {
                checkInputStudent(e, element, 'checkEach');
            });
        }
    });

});

//  Chạy xuyên suốt : cho phần render nếu chuyển trang trong table
document.onload = () => {
}

// đăng xuất button
document.getElementById("logOutBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
    localStorage.removeItem('user');
});

// Thêm sinh viên
function popUpForm(action, readOnlyElementNameID) {
    var boardAdd = document.getElementById("boardAdd");
    boardAdd.style.display = 'block';
    var coverBG = document.querySelector(".coverBG");
    var boardBody = boardAdd.querySelector(".boxBody");
    coverBG.style.display = 'block';
    setTimeout(() => {
        boardBody.style.opacity = '1';
        boardBody.classList.add('visible');
    }, 100);

    // action
    if (action === 'edit') {
        var elementID = document.getElementById(readOnlyElementNameID);
        if (elementID.readOnly === false) {
            elementID.readOnly = true;
            elementID.style.backgroundColor = 'gray';
        }

    }
    else {
        elementID.readOnly = false;
        elementID.style.backgroundColor = '';
        return;
    }

}

function popOutForm() {
    var boardAdd = document.getElementById("boardAdd");
    var coverBG = document.querySelector(".coverBG");
    var boardBody = boardAdd.querySelector(".boxBody");
    boardBody.style.opacity = '0';
    setTimeout(() => {
        boardBody.classList.remove('visible');
        coverBG.style.display = 'none';
        boardAdd.style.display = 'none';
    }, 400)
}

// buttons
document.getElementById("addBtn").addEventListener("click", (e) => {
    // TODO:Tạo hàm check đối tượng truyền vào trước rồi switch theo case
    popUpForm('', 'studentID')
});

document.getElementById("Close").addEventListener("click", (e) => {
    // TODO:Tạo hàm check đối tượng truyền vào trước rồi switch theo case
    submitStudent(e, 'close', patternTheadStudents, patternTbodyStudents());

});
document.getElementById("finishAddInfo").addEventListener("click", (e) => {
    // TODO:Tạo hàm check đối tượng truyền vào trước rồi switch theo case
    submitStudent(e, 'submit', patternTheadStudents, patternTbodyStudents());

});

////////////////////////////////////////////////////////////////

// take Value and reset
function submitStudent(e, action, targetList, theadPatternData, tbodyPatternData) {
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let inputGlobalClass = document.querySelectorAll('[type="text"]');
    let validFeelBackGlobal = document.querySelectorAll('.valid-feedback');
    let inValidFeelBackGlobal = document.querySelectorAll('.invalid-feedback');
    let selectedStatus = document.getElementById('selectStatus');
    e.preventDefault();
    if (action === 'submit') {
        inputGlobalClass.forEach(element => {
            if (element.id !== 'descriptions' || element.id !== 'gender') {
                // check each để lấy dữ liệu
                checkInputStudent(e, element, 'checkEach');
            }
        })
        // vatidate trường Status ( đổi màu đỏ nếu không chọn )
        if (selectedStatus.value === '') {
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
        } else {
            selectedStatus.style.borderColor = '';
        }
        // ********* lấy NỐT dữ liệu gender vs descriptions riêng ( không có trong hàm CheckInput ) *********
        newInformationStudent.Descriptions = descriptions;
        newInformationStudent.Gender = gender;
        newInformationStudent.Status = selectedStatus.value;

        // Reset trạng thái ẩn cảnh báo cho tất cả các trường
        document.querySelector('#addForm').reset();
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
        //**** Lưu giá trị vào mảng
        // check trước là sửa hay push mới 
        if (document.querySelector('#studentID').readOnly === true) {
            document.querySelector('#studentID').readOnly = false;
            CheckExistToOverride(newInformationStudent);
            console.log()
            localStorage.setItem('studentsList', JSON.stringify(StudentsList));
        } else {
            StudentsList.push(newInformationStudent);
            localStorage.setItem('studentsList', JSON.stringify(StudentsList));
        }
        //  làm các việc còn lại
        renderCatalogs(targetList, theadPatternData, tbodyPatternData);
        popOutForm();

    } else if (action == 'close') {
        document.querySelector('#addForm').reset();
        // Reset trạng thái ẩn cảnh báo cho tất cả các trường
        for (var i = 0; i < validFeelBackGlobal.length; i++) {
            validFeelBackGlobal[i].style.display = 'none';
        }
        for (var i = 0; i < inValidFeelBackGlobal.length; i++) {
            inValidFeelBackGlobal[i].style.display = 'none';
            console.log(inValidFeelBackGlobal[i].style.display);
        }
        for (var i = 0; i < inputGlobalClass.length; i++) {
            inputGlobalClass[i].classList.remove('is-valid');
            inputGlobalClass[i].classList.remove('is-invalid');
        }
        popOutForm();
    }
};

//  Validate function
function checkInputStudent(e, studentList, action) {
    // target la một list các element Input type text của đối tượng studentList
    e.preventDefault();
    const feelBackID = document.getElementById('feelBackID');
    const feelBackBirthday = document.getElementById('feelBackBirthday');
    const feelBackName = document.getElementById('feelBackName');
    const feelBackClass = document.getElementById('feelBackClass');
    const feelBackAddress = document.getElementById('feelBackAddress');
    const feelBackEmail = document.getElementById('feelBackEmail');
    const feelBackPhone = document.getElementById('feelBackPhone');

    // Condition
    var isValid = true;
    // Validate trường studentID
    if (studentList.id === 'studentID') {
        if (studentList.value === "") {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackID.querySelector('.invalid-feedback');
            feelBackID.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'ID không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            var isExistingID = StudentsList.some(function (element) {
                return studentList.value === element.studentID;
            });

            if (isExistingID) {
                studentList.classList.remove('is-valid');
                studentList.classList.add('is-invalid');
                var invalidFeedback = feelBackID.querySelector('.invalid-feedback');
                feelBackID.querySelector('.valid-feedback').style.display = 'none';
                invalidFeedback.innerHTML = 'ID đã tồn tại!';
                invalidFeedback.style.display = 'block';
                isValid = false;
            } else {
                studentList.classList.add('is-valid');
                studentList.classList.remove('is-invalid');
                feelBackID.querySelector('.valid-feedback').style.display = 'block';
                feelBackID.querySelector('.invalid-feedback').style.display = 'none';

                newInformationStudent.studentID = studentList.value;

                isValid = true;
            }
        }
    }
    //
    if (studentList.id === 'birthDay') {
        if (studentList.value === "") {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackBirthday.querySelector('.invalid-feedback');
            feelBackBirthday.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Ngày sinh không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackBirthday.querySelector('.valid-feedback').style.display = 'block';
            feelBackBirthday.querySelector('.invalid-feedback').style.display = 'none';

            formatBirthday(studentList);

            newInformationStudent.Birthday = studentList.value;

            isValid = true;
        }
    }
    //
    if (studentList.id === 'name') {
        if (studentList.value === "") {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackName.querySelector('.invalid-feedback');
            feelBackName.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Tên không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackName.querySelector('.valid-feedback').style.display = 'block';
            feelBackName.querySelector('.invalid-feedback').style.display = 'none';

            newInformationStudent.Name = studentList.value;

            isValid = true;
        }
    }
    //
    if (studentList.id === 'classStudy') {
        if (studentList.value === "") {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackClass.querySelector('.invalid-feedback');
            feelBackClass.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Lớp không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackClass.querySelector('.valid-feedback').style.display = 'block';
            feelBackClass.querySelector('.invalid-feedback').style.display = 'none';

            newInformationStudent.Class = studentList.value;

            isValid = true;
        }
    }
    //
    if (studentList.id === 'address') {
        if (studentList.value === "") {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackAddress.querySelector('.invalid-feedback');
            feelBackAddress.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Địa chỉ không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackAddress.querySelector('.valid-feedback').style.display = 'block';
            feelBackAddress.querySelector('.invalid-feedback').style.display = 'none';

            newInformationStudent.Address = studentList.value;

            isValid = true;
        }
    }
    //
    if (studentList.id === 'email') {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
        if (!emailPattern.test(email.value)) {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackEmail.querySelector('.invalid-feedback');
            feelBackEmail.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Email không đúng !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackEmail.querySelector('.valid-feedback').style.display = 'block';
            feelBackEmail.querySelector('.invalid-feedback').style.display = 'none';

            newInformationStudent.Email = studentList.value;

            isValid = true;
        }
    }
    //
    if (studentList.id === 'phone') {
        var phoneNumber = phone.value.replace(/[-\s]/g, '');
        var phoneNumberPattern = /^\d{2}(?:\d{4}\d{4}|\d{8}|\d\d?\d{3,4}\d{4})$/;
        if (!phoneNumberPattern.test(phoneNumber)) {
            studentList.classList.remove('is-valid');
            studentList.classList.add('is-invalid');
            var invalidFeedback = feelBackPhone.querySelector('.invalid-feedback');
            feelBackPhone.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'Số điện thoại không đúng !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            studentList.classList.add('is-valid');
            studentList.classList.remove('is-invalid');
            feelBackPhone.querySelector('.valid-feedback').style.display = 'block';
            feelBackPhone.querySelector('.invalid-feedback').style.display = 'none';

            newInformationStudent.Phone = studentList.value;
            formatNumber(studentList);

            isValid = true;
        }
    }
    // *** Action cho func

    if (action === 'checkEach') {
        if (isValid) {
            return true;
        } else {
            return false;
        }
    }
}
////////////////////////////////
// format cho số điện thoại
function formatNumber(target) {
    if (!target) {
        return;
    }
    const phoneNumber = target.value;
    const formattedNumber = formatPhoneNumber(phoneNumber);
    target.value = formattedNumber;

}
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');

    const formatted = cleaned.slice(0, 2) + ' - ' + cleaned.slice(2, 6) + ' - ' + cleaned.slice(6);

    return formatted;
}
// format ngày sinh 
function formatBirthday(target) {
    if (!target) {
        return;
    }
    const birthDay = target.value;
    const formattedNumber = formatBirthdayNumber(birthDay);
    target.value = formattedNumber;

}
function formatBirthdayNumber(birthDay) {
    const cleaned = birthDay.replace(/\D/g, '');

    const formatted = cleaned.slice(0, 2) + ' / ' + cleaned.slice(2, 4) + ' / ' + cleaned.slice(4);

    return formatted;
}
// Render 
function renderCatalogs(targetList, theadPatternData, tbodyPatternData) {
    // target list truyền vào thì đã lấy dữ liệu từ local rồi 
    var currentPage = 1;
    var catalogsPerPage = 10; // 10 đứa mỗi trang
    var startIndex = (currentPage - 1) * catalogsPerPage;
    var endIndex = startIndex + catalogsPerPage;
    var catalogs = targetList.slice(startIndex, endIndex);

    // thead
    var thead = document.querySelector('#tableBody thead');
    if (thead == null) return;
    var row = document.createElement('tr');
    thead.innerHTML = '';
    row.innerHTML = theadPatternData;
    thead.appendChild(row);

    // tbody
    var tBody = document.querySelector('#tableBody tbody');
    if (tBody == null) return;

    tBody.innerHTML = '';
    catalogs.forEach(function (catalog, index) {
        var row = document.createElement('tr');
        row.innerHTML = tbodyPatternData(catalog, index);
        tBody.appendChild(row);
        askBeforeDelete(catalog.studentID);
    });

    renderPagination(targetList, theadPatternData, tbodyPatternData);
}
// render pagination ********************************
// function renderPagination(targetList, theadPatternData, tbodyPatternData) {
//     var totalPages = Math.ceil(targetList.length / catalogsPerPage);
//     var pagination = document.querySelector('#pagination');
//     pagination.innerHTML = '';

//     var startPage = Math.max(1, currentPage - 2);
//     var endPage = Math.min(totalPages, startPage + 4);

//     // Tạo nút '<<' (Trang đầu tiên)
//     var firstButton = document.createElement("a");
//     firstButton.href = "#";
//     firstButton.innerHTML = "Fist";
//     firstButton.style.fontSize = "14px";
//     firstButton.style.fontWeight = "500";
//     firstButton.disabled = currentPage === 1;
//     firstButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         currentPaxge = 1;
//         renderCatalogs(targetList, theadPatternData, tbodyPatternData);
//     });
//     var currentPage = 1;
//     var catalogsPerPage = 10; // 10 đứa mỗi trang
//     pagination.appendChild(firstButton);

//     // Tạo nút '<' (Trang trước)
//     var prevButton = document.createElement("a");
//     prevButton.href = "#";
//     prevButton.innerHTML = "Prev";
//     prevButton.disabled = currentPage === 1;
//     prevButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         currentPage--;
//         renderCatalogs(targetList, theadPatternData, tbodyPatternData);
//     });
//     var currentPage = 1;
//     var catalogsPerPage = 10; // 10 đứa mỗi trang
//     pagination.appendChild(prevButton);

//     for (var i = startPage; i <= endPage; i++) {
//         var link = document.createElement("a");
//         link.href = "#";
//         link.textContent = i;
//         if (i === currentPage) {
//             link.classList.add("active");
//         }
//         link.addEventListener("click", function (event) {
//             event.preventDefault();
//             currentPage = parseInt(this.textContent);
//             renderCatalogs(targetList, theadPatternData, tbodyPatternData);
//         });
//         var currentPage = 1;
//         var catalogsPerPage = 10; // 10 đứa mỗi trang
//         pagination.appendChild(link);
//     }

//     // Tạo nút '>' (Trang kế tiếp)
//     var nextButton = document.createElement("a");
//     nextButton.href = "#";
//     nextButton.innerHTML = "Next";
//     nextButton.disabled = currentPage === totalPages;
//     nextButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         currentPage++;
//         renderCatalogs(targetList, theadPatternData, tbodyPatternData);
//     });
//     var currentPage = 1;
//     var catalogsPerPage = 10; // 10 đứa mỗi trang
//     pagination.appendChild(nextButton);

//     // Tạo nút '>>' (Trang cuối cùng)
//     var lastButton = document.createElement("a");
//     lastButton.href = "#";
//     lastButton.innerHTML = "Last";
//     lastButton.style.fontSize = "14px";
//     lastButton.style.fontWeight = "500";
//     lastButton.disabled = currentPage === totalPages;
//     lastButton.addEventListener("click", function (event) {
//         event.preventDefault();
//         currentPage = totalPages;
//         renderCatalogs(targetList, theadPatternData, tbodyPatternData);
//     });
//     var currentPage = 1;
//     var catalogsPerPage = 10; // 10 đứa mỗi trang
//     pagination.appendChild(lastButton);
// }

//  render pages change Buttons
function renderPagination(targetList, theadPatternData, tbodyPatternData) {
    var totalPages = Math.ceil(targetList.length / 10); // 10 đứa mỗi trang
    var pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';

    var startPage = Math.max(1, currentPage - 2);
    var endPage = Math.min(totalPages, startPage + 4);

    var createPageLink = function (pageNumber) {
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = pageNumber;
        link.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = pageNumber;
            renderCatalogs(targetList, theadPatternData, tbodyPatternData);
        });
        return link;
    };

    // Tạo nút '<<' (Trang đầu tiên)
    var firstButton = createPageLink(1);
    firstButton.innerHTML = "First";
    firstButton.style.fontSize = "14px";
    firstButton.style.fontWeight = "500";
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = 1;
        renderCatalogs(targetList, theadPatternData, tbodyPatternData);
    });
    pagination.appendChild(firstButton);

    // Tạo nút '<' (Trang trước)
    var prevButton = createPageLink(currentPage - 1);
    prevButton.innerHTML = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage--;
        renderCatalogs(targetList, theadPatternData, tbodyPatternData);
    });
    pagination.appendChild(prevButton);

    for (var i = startPage; i <= endPage; i++) {
        var link = createPageLink(i);
        if (i === currentPage) {
            link.classList.add("active");
        }
        pagination.appendChild(link);
    }

    // Tạo nút '>' (Trang kế tiếp)
    var nextButton = createPageLink(currentPage + 1);
    nextButton.innerHTML = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage++;
        renderCatalogs(targetList, theadPatternData, tbodyPatternData);
    });
    pagination.appendChild(nextButton);

    // Tạo nút '>>' (Trang cuối cùng)
    var lastButton = createPageLink(totalPages);
    lastButton.innerHTML = "Last";
    lastButton.style.fontSize = "14px";
    lastButton.style.fontWeight = "500";
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = totalPages;
        renderCatalogs(targetList, theadPatternData, tbodyPatternData);
    });
    pagination.appendChild(lastButton);
}

function EditInfo(catalogID) {
    StudentsList = JSON.parse(localStorage.getItem('studentsList'));
    let selectedStatus = document.getElementById('selectStatus');
    let inputGlobalClass = document.querySelectorAll('[type="text"]');
    var catalog = StudentsList.find(function (catalog) {
        return catalog.studentID === catalogID;
    });
    if (catalog != null) {
        popUpForm('edit');
        selectedStatus.value = catalog.Status;
        let maleFemale = document.querySelectorAll('#gender');
        maleFemale.forEach(sex => {
            if (sex.value === catalog.Gender) {
                sex.checked = true;
            }
        });
        inputGlobalClass.forEach(element => {
            switch (element.id) {
                case 'studentID':
                    element.value = catalog.studentID;
                    break;
                case 'birthDay':
                    element.value = catalog.Birthday;
                    break;
                case 'name':
                    element.value = catalog.Name;
                    break;
                case 'classStudy':
                    element.value = catalog.Class;
                    break;
                case 'address':
                    element.value = catalog.Address;
                    break;
                case 'email':
                    element.value = catalog.Email;
                    break;
                case 'descriptions':
                    element.value = catalog.Descriptions;
                    break;
                case 'phone':
                    element.value = catalog.Phone;
                    break;
            }
        })
    }
    else {
        console.log('Danh mục không tồn tại.');
    }
}

//  kiểm tra tồn tại chưa và ghi đè 
function CheckExistToOverride(targetObj) {
    console.log(targetObj);
    StudentsList.forEach((oldObj, index) => {
        if (oldObj.studentID === targetObj.studentID) {
            StudentsList[index] = targetObj;
        }
    });
}



// xoá student

function askBeforeDelete(studentID) {
    document.getElementById('Yes').addEventListener('click', () => { DeleteInfo(studentID) });
}
function DeleteInfo(studentId) {
    var catalogIndex = StudentsList.findIndex(function (catalog) {
        return catalog.studentID === studentId;
    });
    if (catalogIndex != -1) {

        StudentsList.splice(catalogIndex, 1);
    } else {
        console.log('Danh mục không tồn tại.');
    }
    localStorage.setItem('studentsList', JSON.stringify(StudentsList));
    renderCatalogs();
    document.querySelector('#addForm').reset();
}

