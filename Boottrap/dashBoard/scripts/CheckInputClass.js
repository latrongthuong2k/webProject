function checkInputClass(elementInput, action) {
    // target la một list các element Input type text của đối tượng 

    const feelBackClassID = document.getElementById('feelBackClassID');
    const feelBackClassName = document.getElementById('feelBackClassName');
    const feelBackLecturerName = document.getElementById('feelBackLecturerName');
    const feelBackTotalNumber = document.getElementById('feelBackTotalNumber');
    // Condition
    var isValid = true;
    // Validate trường studentID
    if (elementInput.id === 'ClassId') {
        if (elementInput.value === "") {
            elementInput.classList.remove('is-valid');
            elementInput.classList.add('is-invalid');
            var invalidFeedback = feelBackClassID.querySelector('.invalid-feedback');
            feelBackClassID.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'ID lớp không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            var isExistingID = false;
            for (var i = 0; i < currentTargetList.length; i++) {
                if (currentTargetList[i].ClassId === elementInput.value) {
                    isExistingID = true;
                    break;
                }
            }
            if (isExistingID) {

                elementInput.classList.remove('is-valid');
                elementInput.classList.add('is-invalid');
                elementInput.style.backgroundColor = bgColorWarning;
                var invalidFeedback = feelBackClassID.querySelector('.invalid-feedback');
                feelBackClassID.querySelector('.valid-feedback').style.display = 'none';
                invalidFeedback.innerHTML = ' ID Lớp học đã tồn tại, xin vui lòng nhập ID khác !';
                invalidFeedback.style.display = 'block';
                isValid = false;
            } else {
                elementInput.classList.add('is-valid');
                elementInput.classList.remove('is-invalid');
                feelBackClassID.querySelector('.valid-feedback').style.display = 'block';
                feelBackClassID.querySelector('.invalid-feedback').style.display = 'none';

                classRoom.ClassId = elementInput.value;

                isValid = true;
            }
        }
    }
    //
    if (elementInput.id === 'ClassName') {
        if (elementInput.value === "") {
            elementInput.classList.remove('is-valid');
            elementInput.classList.add('is-invalid');
            var invalidFeedback = feelBackClassName.querySelector('.invalid-feedback');
            feelBackClassName.querySelector('.valid-feedback').style.display = 'none';
            invalidFeedback.innerHTML = 'tên lớp không được để trống !';
            invalidFeedback.style.display = 'block';
            isValid = false;
        } else {
            elementInput.classList.add('is-valid');
            elementInput.classList.remove('is-invalid');
            feelBackClassName.querySelector('.valid-feedback').style.display = 'block';
            feelBackClassName.querySelector('.invalid-feedback').style.display = 'none';


            classRoom.ClassName = elementInput.value;

            isValid = true;
        }
    }
    //
    if (elementInput.id === 'TotalNumber') {
        if (elementInput.value === "") {
            elementInput.classList.remove('is-valid');
            elementInput.classList.add('is-invalid');
            var invalidFeedback = feelBackTotalNumber.querySelector('.invalid-feedback');
            feelBackTotalNumber.querySelector('.valid-feedback').style.display = 'none';
            feelBackTotalNumber.innerHTML = 'Sỉ số không được để trống !';
            feelBackTotalNumber.style.display = 'block';
            isValid = false;
        } else {
            elementInput.classList.add('is-valid');
            elementInput.classList.remove('is-invalid');
            feelBackTotalNumber.querySelector('.valid-feedback').style.display = 'block';
            feelBackTotalNumber.querySelector('.invalid-feedback').style.display = 'none';

            classRoom.TotalNumber = elementInput.value;

            isValid = true;
        }
    }
    if (elementInput.id === 'LecturerName') {
        if (elementInput.value === "") {
            elementInput.classList.remove('is-valid');
            elementInput.classList.add('is-invalid');
            var invalidFeedback = feelBackLecturerName.querySelector('.invalid-feedback');
            feelBackLecturerName.querySelector('.valid-feedback').style.display = 'none';
            feelBackLecturerName.innerHTML = 'Tên giáo viên không được để trống !';
            feelBackLecturerName.style.display = 'block';
            isValid = false;
        } else {
            elementInput.classList.add('is-valid');
            elementInput.classList.remove('is-invalid');
            feelBackLecturerName.querySelector('.valid-feedback').style.display = 'block';
            feelBackLecturerName.querySelector('.invalid-feedback').style.display = 'none';

            // Ghi vào trong đối tượng classRoom
            classRoom.Lecturer = elementInput.value;

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
