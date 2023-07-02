let listCatalog = localStorage.getItem("listCatalog") ? JSON.parse(localStorage.getItem("listCatalog")) : [];
document.onload = renderCatalogs();

var currentPage = 1;
var catalogsPerPage = 5;
var editingCatalogID = 0;

function renderCatalogs() {
    var startIndex = (currentPage - 1) * catalogsPerPage;
    var endIndex = startIndex + catalogsPerPage;
    var catalogs = listCatalog.slice(startIndex, endIndex);

    var tableBody = document.querySelector('#catalogTable tbody');
    tableBody.innerHTML = '';

    catalogs.forEach(function (catalog, index) {
        var row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${catalog.catalogName}</td>
          <td>${catalog.gender}</td>
          <td>${catalog.email}</td>
          <td>${catalog.phone}</td>
          <td>${catalog.level}</td>
          <td>${catalog.point}</td>
          <td class ="deleteButton"><button  onclick="deleteCatalog('${catalog.catalogName}')">削除</button></td>
        `;
        isColor = true;
        tableBody.appendChild(row);
    });

    renderPagination();
}

function renderPagination() {
    var totalPages = Math.ceil(listCatalog.length / catalogsPerPage);
    var pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';

    for (var i = 1; i <= totalPages; i++) {
        var link = document.createElement('a');
        link.href = '#';
        link.textContent = i;
        if (i === currentPage) {
            link.classList.add('active');
        }
        link.onclick = function (event) {
            event.preventDefault();
            currentPage = parseInt(this.textContent);
            renderCatalogs();
        };
        pagination.appendChild(link);
    }
}

function addCatalog(event) {
    event.preventDefault();

    var catalogName = document.querySelector('#catalogName').value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var email = document.querySelector('#email').value;
    var phone = document.querySelector('#phone').value;
    var level = document.querySelector('#japaneseLevel').value;
    var point = document.querySelector('#point').value;

    var newCatalog = {
        catalogName: catalogName,
        email: email,
        phone: phone,
        level: level,
        point: point,
        gender: gender
    };

    listCatalog.push(newCatalog);
    localStorage.setItem('listCatalog', JSON.stringify(listCatalog));

    document.querySelector('#addForm').reset();
    renderCatalogs();
}


// function editCatalog(catalogIdIndex) {
//     var catalog = listCatalog.find(function (catalog) {
//         return catalog.catalogId === catalogIdIndex;
//     });
//     if (catalog != null) {
//         document.querySelector('#catalogId').value = catalog.catalogId;
//         document.querySelector('#catalogName').value = catalog.catalogName;
//         document.querySelector('#priority').value = catalog.priority;
//         document.querySelector('#descriptions').value = catalog.descriptions;
//         document.querySelector('#status').value = catalog.status;

//         editingCatalogID = catalogIdIndex;
//     }
//     else {
//         console.log('Danh mục không tồn tại.');
//     }
// }

function deleteCatalog(Name) {
    var catalogIndex = listCatalog.findIndex(function (catalog) {
        return catalog.catalogName === Name;
    });
    if (catalogIndex != -1) {
        listCatalog.splice(catalogIndex, 1);
    } else {
        console.log('Danh mục không tồn tại.');
    }
    localStorage.setItem('listCatalog', JSON.stringify(listCatalog));
    renderCatalogs();
    document.querySelector('#addForm').reset();


}

function searchCatalog(event) {
    event.preventDefault();

    var searchKeyword = document.querySelector('#searchKeyword').value;
    var searchResults = listCatalog.filter(function (catalog) {
        return catalog.catalogName.toLowerCase().includes(searchKeyword.toLowerCase());
    });

    listCatalog = searchResults;
    currentPage = 1;

    renderCatalogs();
}

document.querySelector('#addForm').addEventListener('submit', (e) => {
    if (checkInput(e) == true) {
        addCatalog(e);
    }
});
document.querySelector('#searchForm').addEventListener('submit', searchCatalog);

function checkInput(e) {
    e.preventDefault();
    const nameInput = document.getElementById('catalogName');
    const gender = document.querySelectorAll('input[name="gender"]');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const levelInput = document.getElementById('japaneseLevel');
    const point = document.getElementById('point');
    const popUp = document.getElementsByClassName('pop-up');


    var isValid = true;

    // Reset trạng thái ẩn cảnh báo cho tất cả các trường
    for (var i = 0; i < popUp.length; i++) {
        popUp[i].style.visibility = 'hidden';
    }

    // Validate trường Họ và tên
    if (nameInput.value === "") {
        popUp[0].style.visibility = 'visible';
        isValid = false;
    }
    var isGenderSelected = false;
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            isGenderSelected = true;
            break;
        }
    }
    if (!isGenderSelected) {
        popUp[1].style.visibility = 'visible';
        isValid = false;
    }

    // Validate trường Email
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;
    if (!emailPattern.test(emailInput.value)) {
        popUp[2].innerHTML = "「メール」を正しいに入力して。";
        popUp[2].style.visibility = 'visible';
        isValid = false;
    }
    // Validate trường Số điện thoại
    var phoneNumber = phoneInput.value.replace(/[-\s]/g, '');
    var phoneNumberPattern = /^\d{2}(?:\d{4}\d{4}|\d{8}|\d\d?\d{3,4}\d{4})$/;
    if (!phoneNumberPattern.test(phoneNumber)) {
        console.log(phoneNumber);
        popUp[3].innerHTML = "「電話番号」を正しく入力してください。";
        popUp[3].style.visibility = 'visible';
        isValid = false;
    }

    // Validate level
    if (levelInput.value === "") {
        popUp[4].style.visibility = 'visible';
        isValid = false;
    }
    // Validate point
    if (point.value === "") {
        popUp[5].style.visibility = 'visible';
        isValid = false;
    } else {
        var pointValue = parseInt(point.value);
        if (isNaN(pointValue) || pointValue < 0 || pointValue > 180) {
            popUp[5].innerHTML = " 0 〜 180 の「点数」を入力して。";
            popUp[5].style.visibility = 'visible';
            isValid = false;
        }
    }
    // Nếu không có trường nào bị không hợp lệ, cho phép submit biểu mẫu
    if (isValid) {
        return true;
    } else {
        return false;
    }
}


function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');

    const formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 - $2 - $3');

    return formatted;
}

const nameInput = document.getElementById('catalogName');
const gender = document.querySelectorAll('input[name="gender"]');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const levelInput = document.getElementById('japaneseLevel');
const point = document.getElementById('point');
const popUp = document.getElementsByClassName('pop-up');

document.getElementById('catalogName').addEventListener("blur", function () {
    if (nameInput.value === "") {
        popUp[0].style.visibility = 'visible';
    }
})
nameInput.addEventListener("input", function () {
    popUp[0].style.visibility = 'hidden';
})
//
emailInput.addEventListener("blur", function () {
    //gender
    if (gender[0].checked === false && gender[0].checked === false) {
        popUp[1].style.visibility = 'visible';
    }
    if (emailInput.value === "") {
        popUp[2].innerHTML = "「メール」を入力して。";
        popUp[2].style.visibility = 'visible';
    }
})
gender[0].addEventListener("change", function () {
    popUp[1].style.visibility = 'hidden';
})
gender[1].addEventListener("change", function () {
    popUp[1].style.visibility = 'hidden';
})
emailInput.addEventListener('input', function (event) {
    popUp[2].style.visibility = 'hidden';
});
//
phoneInput.addEventListener("blur", function () {
    if (phoneInput.value === "") {
        popUp[3].innerHTML = "「電話番号」を入力して。";
        popUp[3].style.visibility = 'visible';
    }
})
phoneInput.addEventListener('input', function (event) {
    popUp[3].style.visibility = 'hidden';
    const phoneNumber = event.target.value;
    const formattedNumber = formatPhoneNumber(phoneNumber);
    phoneInput.value = formattedNumber;
});
//
point.addEventListener("blur", function () {
    if (point.value === "") {
        popUp[5].innerHTML = "「点数」を入力して。";
        popUp[5].style.visibility = 'visible';
    }
})
point.addEventListener('input', function (event) {
    if (parseInt(point.value) <= 180) {
        popUp[5].style.visibility = 'hidden';
    }
    else {
        popUp[5].innerHTML = " 0 〜 180 の「点数」を入力して。";
        popUp[5].style.visibility = 'visible';
    }
});



renderCatalogs();