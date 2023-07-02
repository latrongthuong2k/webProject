// var listCatalog = [
//     { catalogId: '1', catalogName: 'Danh mục 1', priority: 1, descriptions: 'Mô tả danh mục 1', status: 'active' },
//     { catalogId: '2', catalogName: 'Danh mục 2', priority: 2, descriptions: 'Mô tả danh mục 2', status: 'inactive' },
//     { catalogId: '3', catalogName: 'Danh mục 3', priority: 3, descriptions: 'Mô tả danh mục 3', status: 'active' },
//     { catalogId: '4', catalogName: 'Danh mục 4', priority: 4, descriptions: 'Mô tả danh mục 4', status: 'active' },
//     { catalogId: '5', catalogName: 'Danh mục 5', priority: 5, descriptions: 'Mô tả danh mục 5', status: 'inactive' },
//     { catalogId: '6', catalogName: 'Danh mục 6', priority: 6, descriptions: 'Mô tả danh mục 6', status: 'active' },
//     { catalogId: '7', catalogName: 'Danh mục 7', priority: 7, descriptions: 'Mô tả danh mục 7', status: 'active' },
//     { catalogId: '8', catalogName: 'Danh mục 8', priority: 8, descriptions: 'Mô tả danh mục 8', status: 'inactive' },
//     { catalogId: '9', catalogName: 'Danh mục 9', priority: 9, descriptions: 'Mô tả danh mục 9', status: 'active' },
//     { catalogId: '10', catalogName: 'Danh mục 10', priority: 10, descriptions: 'Mô tả danh mục 10', status: 'active' }
// ];
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

    catalogs.forEach(function (catalog) {
        var row = document.createElement('tr');
        row.innerHTML = `
          <td>${catalog.catalogId}</td>
          <td>${catalog.catalogName}</td>
          <td>${catalog.priority}</td>
          <td>${catalog.descriptions}</td>
          <td>${catalog.status}</td>
          <td><button onclick="editCatalog('${catalog.catalogId}')">Sửa</button> 
          <button onclick="deleteCatalog('${catalog.catalogId}')">Xóa</button></td>
        `;
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

    var catalogId = document.querySelector('#catalogId').value;
    var catalogName = document.querySelector('#catalogName').value;
    var priority = document.querySelector('#priority').value;
    var descriptions = document.querySelector('#descriptions').value;
    var status = document.querySelector('#status').value;

    var newCatalog = {
        catalogId: catalogId,
        catalogName: catalogName,
        priority: priority,
        descriptions: descriptions,
        status: status
    };

    if (document.getElementById('addInfo').textContent == 'Sửa') {
        for (var i = 0; i < listCatalog.length; i++) {
            if (listCatalog[i].catalogId == editingCatalogID) {
                listCatalog[i] = newCatalog;
            }
            document.getElementById('addInfo').textContent = 'Thêm mới';
            document.getElementById('addInfo').style.color = '';

        }
    }
    else {
        listCatalog.push(newCatalog);
        localStorage.setItem('catalogList', JSON.stringify(listCatalog));
    }

    document.querySelector('#addForm').reset();
    renderCatalogs();
}


function editCatalog(catalogIdIndex) {
    var catalog = listCatalog.find(function (catalog) {
        return catalog.catalogId === catalogIdIndex;
    });
    if (catalog != null) {
        document.querySelector('#catalogId').value = catalog.catalogId;
        document.querySelector('#catalogName').value = catalog.catalogName;
        document.querySelector('#priority').value = catalog.priority;
        document.querySelector('#descriptions').value = catalog.descriptions;
        document.querySelector('#status').value = catalog.status;
        document.getElementById('addInfo').textContent = 'Sửa';
        document.getElementById('addInfo').style.color = 'red';

        editingCatalogID = catalogIdIndex;
    }
    else {
        console.log('Danh mục không tồn tại.');
    }
}

function deleteCatalog(catalogIdIndex) {
    var catalogIndex = listCatalog.findIndex(function (catalog) {
        return catalog.catalogId === catalogIdIndex;
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

document.querySelector('#addForm').addEventListener('submit', addCatalog);
document.querySelector('#searchForm').addEventListener('submit', searchCatalog);

renderCatalogs();