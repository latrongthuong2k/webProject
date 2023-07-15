function sortAZ() {
    let dataCurrentPage = JSON.parse(localStorage.getItem(currentTarget)) ? JSON.parse(localStorage.getItem(currentTarget)) : [];
    sortListAZ(dataCurrentPage);
    localStorage.setItem(currentTarget, JSON.stringify(sortListAZ(dataCurrentPage)));
    renderCatalogs(dataCurrentPage, theadTarget);
};
function sortZA() {
    let dataCurrentPage = JSON.parse(localStorage.getItem(currentTarget)) ? JSON.parse(localStorage.getItem(currentTarget)) : [];
    sortListZA(dataCurrentPage);
    localStorage.setItem(currentTarget, JSON.stringify(sortListZA(dataCurrentPage)));
    renderCatalogs(dataCurrentPage, theadTarget);
};
// Hàm sắp xếp theo list
function caseSort(a, b) {
    var aId;
    var bId;
    switch (currentTarget) {
        case 'studentList':
            aId = a.studentID;
            bId = b.studentID;
            break;
        case 'courseList':
            aId = a.CourseId;
            bId = b.CourseId;
            break;

        case 'classList':
            aId = a.ClassId;
            bId = b.ClassId;
            break;

        case 'userSystems':
            aId = a.email;
            bId = b.email;
            break;
        case 'DashBoard':
            break;
    }
    return { aId: aId, bId: bId };
}
function sortListAZ(list) {
    list.sort(function (a, b) {
        var sortCriteria = caseSort(a, b);
        if (sortCriteria.aId < sortCriteria.bId) {
            return -1;
        } else if (sortCriteria.aId > sortCriteria.bId) {
            return 1;
        } else {
            return 0;
        }
    });

    return list;
}

function sortListZA(list) {
    list.sort(function (a, b) {
        var sortCriteria = caseSort(a, b);
        if (sortCriteria.aId > sortCriteria.bId) {
            return -1;
        } else if (sortCriteria.aId < sortCriteria.bId) {
            return 1;
        } else {
            return 0;
        }
    });

    return list;
}