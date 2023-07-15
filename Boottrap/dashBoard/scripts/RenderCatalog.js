var addForm = document.getElementById('addForm');
var textFix = document.querySelector('.B');

// Render theo đối tượng
var currentPage = 1;
var catalogsPerPage = 10; // 10 đứa

renderCatalogs(currentTargetList);

function renderCatalogs(targetList) {
    // target list truyền vào thì đã lấy dữ liệu từ local rồi 
    // TODO: cho hiển thị emptyPage
    var startIndex = (currentPage - 1) * catalogsPerPage;
    var endIndex = startIndex + catalogsPerPage;
    var catalogs = targetList.slice(startIndex, endIndex);
    var row = document.createElement('tr');

    // tbody
    var tBody = document.querySelector('#tableBody tbody');
    if (tBody == null) return;

    tBody.innerHTML = '';

    catalogs.forEach(function (catalog, index) {
        var row = document.createElement('tr');
        switch (currentTarget) {
            case "Dashboard":
                break;
            case "courseList":
                row.innerHTML = patternTbodyCourse(catalog, index);
                break;
            case "classList":
                row.innerHTML = patternTbodyClass(catalog, index);
                break;
            case "studentList":
                row.innerHTML = patternTbodyStudents(catalog, index);
                break;
            case "userSystems":
                break;
        }
        tBody.appendChild(row);
    });
    //
    renderPagination(targetList);
}

// render pagination ***
function renderPagination(targetList) {
    var startIndex = (currentPage - 1) * catalogsPerPage;
    var endIndex = startIndex + catalogsPerPage;
    var catalogs = targetList.slice(startIndex, endIndex);
    var totalPages = Math.ceil(targetList.length / catalogsPerPage);
    var pagination = document.querySelector('#pagination');
    pagination.innerHTML = '';

    var startPage = Math.max(1, currentPage - 2);
    var endPage = Math.min(totalPages, startPage + 4);

    // Tạo nút '<<' (Trang đầu tiên)
    var firstButton = document.createElement("a");
    firstButton.href = "#";
    firstButton.innerHTML = "First";
    firstButton.style.fontSize = "14px";
    firstButton.style.fontWeight = "500";
    firstButton.disabled = currentPage === 1;
    firstButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = 1;
        renderCatalogs(targetList);
    });

    pagination.appendChild(firstButton);

    // Tạo nút '<' (Trang trước)
    var prevButton = document.createElement("a");
    prevButton.href = "#";
    prevButton.innerHTML = "Prev";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            renderCatalogs(targetList);
        }

    });
    pagination.appendChild(prevButton);

    for (var i = startPage; i <= endPage; i++) {
        var link = document.createElement("a");
        link.href = "#";
        link.textContent = i;
        if (i === currentPage) {
            link.classList.add("active");
        }
        link.addEventListener("click", function (event) {
            event.preventDefault();
            currentPage = parseInt(this.textContent);
            renderCatalogs(targetList);
        });
        pagination.appendChild(link);
    }

    // Tạo nút '>' (Trang kế tiếp)
    var nextButton = document.createElement("a");
    nextButton.href = "#";
    nextButton.innerHTML = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (currentPage < totalPages && currentPage > 1) {
            currentPage++;
            renderCatalogs(targetList);
        }

    });
    pagination.appendChild(nextButton);

    // Tạo nút '>>' (Trang cuối cùng)
    var lastButton = document.createElement("a");
    lastButton.href = "#";
    lastButton.innerHTML = "Last";
    lastButton.style.fontSize = "14px";
    lastButton.style.fontWeight = "500";
    lastButton.disabled = currentPage === totalPages;
    lastButton.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = totalPages;
        renderCatalogs(targetList);
    });
    pagination.appendChild(lastButton);

    // Ẩn nút "First" và "Prev" nếu là trang đầu
    if (currentPage === 1) {
        firstButton.style.backgroundColor = 'rgb(196, 196, 196)';
        prevButton.style.backgroundColor = 'rgb(196, 196, 196)';
    }

    // Ẩn nút "Next" và "Last" nếu là trang cuối
    if (currentPage === totalPages && currentPage > 1) {
        nextButton.style.backgroundColor = 'rgb(196, 196, 196)';
        lastButton.style.backgroundColor = 'rgb(196, 196, 196)';
    }
}

// hàm check để hiển thị trường empty hoặc renderTable


