// BTN toggle Sidebar
let btnToggle = document.getElementById("btnToggle");
// Modal
let modal = document.querySelector(".Modal");
let modalMain = document.querySelector(".Modal__main");
// BTN add, edit, update, close
let btnThemNv = document.getElementById("btnThemNv");
let btnAdd = document.getElementById("btnAdd");
let btnUpdate = document.getElementById("btnUpdate");
let btnClose = document.querySelector(".Modal__button button:last-child");

// khai báo biến & DOM tới các nút
let arrsNhanVien = [];

// DOM lấy value đầu vào
let inputValue = document.querySelectorAll("form input");
let selectValue = document.getElementById("selectValue");
let list = document.querySelector(".listNhanVien");

let editId = null;

btnToggle.onclick = () => {
    document.querySelector(".sidebar").classList.toggle("edit-nav");
    document.querySelector(".sidebar ul").classList.toggle("edit-ul");
};
// Mở tab Thêm nhân viên
btnThemNv.onclick = addNhanVien;
// Đóng tab thêm nhân viên
btnClose.onclick = () => {
    modal.style.zIndex = "-1";
    modalMain.style.transform = "translateY(-100vh)";
}


// ======================== 3. tạo object contructor =============================
function Personnel(
    account,
    name,
    email,
    password,
    workday,
    basicSalary,
    position,
    workingHours
) {
    this.account = account;
    this.name = name;
    this.email = email;
    this.password = password;
    this.workday = workday;
    this.basicSalary = basicSalary;
    this.position = position;
    this.workingHours = workingHours;
}
// ======================== 5. tạo phương thức tổng lương =============================

Personnel.prototype.totalSalary = function (position, basicSalary) {
    return position * basicSalary;
};

// ======================== 6. tạo phương thức xếp loại =============================

Personnel.prototype.ratings = function (workingHours) {
    return workingHours >= 192
        ? `NVXS`
        : workingHours >= 176
            ? `NVG`
            : workingHours >= 160
                ? `NVK`
                : `NVTB`;
};
// ======================== 4. Các hàm VALIDATE giá trị đầu vào =============================

let error = document.querySelectorAll('.showError')
let inputGroup = document.querySelectorAll('.input-group')

// validate giá trị Acount
function validateAccount(value) {
    if ((value.length >= 4) && (value.length <= 6)) {
        inputGroup[1].classList.add('mb-3')
        error[0].innerHTML = '';
        return true;
    }
    else if (value == "") {
        inputGroup[1].classList.remove('mb-3');
        error[0].innerHTML = 'Tài khoản không được bỏ trống';
        return false;
    } else {
        inputGroup[1].classList.remove('mb-3');
        error[0].innerHTML = 'Tài khoản tối đa 4 - 6 ký số';
        return false;
    }
};
// Kiểm tra dữ liệu Acount
inputValue[1].onblur = () => {
    if (validateAccount(inputValue[1].value)) {
        inputValue[1].style.border = "1px solid blue";
    } else {
        inputValue[1].style.border = "1px solid red";
    }
};
// validate giá trị Name
function validateName(value) {
    let validate = new RegExp("^[A-Za-z]+$");
    if (validate.test(value)) {
        inputGroup[2].classList.add('mb-3')
        error[1].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[2].classList.remove('mb-3');
        error[1].innerHTML = 'Tên nhân viên không được bỏ trống';
        return false;
    } else {
        inputGroup[2].classList.remove('mb-3');
        error[1].innerHTML = 'Tên nhân viên phải là chữ';
        return false;
    }
};
// Kiểm tra dữ liệu Name
inputValue[2].onblur = () => {
    if (validateName(inputValue[2].value)) {
        inputValue[2].style.border = "1px solid blue";
    } else {
        inputValue[2].style.border = "1px solid red";
    }
};
// validate giá trị Email
function validateEmail(value) {
    let validate = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validate.test(value)) {
        inputGroup[3].classList.add('mb-3')
        error[2].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[3].classList.remove('mb-3');
        error[2].innerHTML = 'Email không được bỏ trống';
        return false;
    } else {
        inputGroup[3].classList.remove('mb-3');
        error[2].innerHTML = ' Email không đúng định dạng';
        return false;
    }
};
// Kiểm tra dữ liệu Email
inputValue[3].onblur = () => {
    if (validateEmail(inputValue[3].value)) {
        inputValue[3].style.border = "1px solid blue";
    } else {
        inputValue[3].style.border = "1px solid red";
    }
};
// validate giá trị Password
function validatePassword(value) {
    let validate =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
    if (validate.test(value)) {
        inputGroup[4].classList.add('mb-3')
        error[3].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[4].classList.remove('mb-3');
        error[3].innerHTML = 'Mật khẩu không được bỏ trống';
        return false;
    } else {
        inputGroup[4].classList.remove('mb-3');
        error[3].innerHTML = 'Mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)';
        return false;
    }
};
// Kiểm tra dữ liệu Password
inputValue[4].onblur = () => {
    if (validatePassword(inputValue[4].value)) {
        inputValue[4].style.border = "1px solid blue";
    } else {
        inputValue[4].style.border = "1px solid red";
    }
};
// validate giá trị Workday
function validateWorkday(value) {
    let validate =
        /^(?:\d{4}\-(?:(?:(?:(?:0[13578]|1[02])\-(?:0[1-9]|[1-2][0-9]|3[01]))|(?:(?:0[469]|11)\-(?:0[1-9]|[1-2][0-9]|30))|(?:02\-(?:0[1-9]|1[0-9]|2[0-8]))))|(?:(?:\d{2}(?:0[48]|[2468][048]|[13579][26]))|(?:(?:[02468][048])|[13579][26])00)\-02\-29)$/;
    if (validate.test(value)) {
        inputGroup[5].classList.add('mb-3')
        error[4].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[5].classList.remove('mb-3');
        error[4].innerHTML = 'Ngày làm không được để trống';
        return false;
    } else {
        inputGroup[5].classList.remove('mb-3');
        error[4].innerHTML = ' Ngày làm theo định dạng yyyy/mm/dd';
        return false;
    }
};
// Kiểm tra dữ liệu Workday
inputValue[5].onblur = () => {
    if (validateWorkday(inputValue[5].value)) {
        inputValue[5].style.border = "1px solid blue";
    } else {
        inputValue[5].style.border = "1px solid red";
    }
};
// validate giá trị BasicSalary
function validateBasicSalary(value) {
    if (value >= 1000000 && value <= 20000000) {
        inputGroup[6].classList.add('mb-3')
        error[5].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[6].classList.remove('mb-3');
        error[5].innerHTML = 'Lương cơ bản không được để trống';
        return false;
    } else {
        inputGroup[6].classList.remove('mb-3');
        error[5].innerHTML = 'Lương cơ bản từ 1.000.000 - 20.000.000';
        return false;
    }
};
// Kiểm tra dữ liệu BasicSalary
inputValue[6].onblur = () => {
    if (validateBasicSalary(inputValue[6].value)) {
        inputValue[6].style.border = "1px solid blue";
    } else {
        inputValue[6].style.border = "1px solid red";
    }
};
// validate giá trị WorkingHours
function validateWorkingHours(value) {
    if (80 <= value && value <= 200) {
        inputGroup[8].classList.add('mb-3')
        error[7].innerHTML = '';
        return true;
    } else if (value === '') {
        inputGroup[8].classList.remove('mb-3');
        error[7].innerHTML = 'Số giờ làm không được để trống';
        return false;
    } else {
        inputGroup[8].classList.remove('mb-3');
        error[7].innerHTML = 'Số giờ làm trong tháng phải từ 80 - 200 giờ';
        return false;
    }
};
// Kiểm tra dữ liệu WorkingHours
inputValue[7].onblur = () => {
    if (validateWorkingHours(inputValue[7].value)) {
        inputValue[7].style.border = "1px solid blue";
    } else {
        inputValue[7].style.border = "1px solid red";
    }
};
// validate giá trị validatePosition
function validatePosition(position) {
    return position == "Trưởng Phòng" ? 2 : position == "Sếp" ? 3 : 1;
};

// (1. In ra table danh sách nhân viên) + (2. Thêm nhân viên) 

btnAdd.onclick = () => {  
    if (
        validateAccount(inputValue[1].value) &&
        validateName(inputValue[2].value) &&
        validateEmail(inputValue[3].value) &&
        validatePassword(inputValue[4].value) &&
        validateWorkday(inputValue[5].value) &&
        validateBasicSalary(inputValue[6].value) &&
        validateWorkingHours(inputValue[7].value)
    ) {    
        createNhanVien();
        renderArrs(arrsNhanVien);
        resetValueInput();
        console.log(arrsNhanVien)
        alert('Thêm nhân viên mới thành công');            
    } else {
        alert('vui lòng nhập lại');
    } 
};
// Hàm tạo Object nhân viên từ dữ liệu nhập vào
function createNhanVien() {
    // tạo đối tượng mới và truyền dữ liệu vào
    let nhanVien = new Personnel();
    nhanVien.account = inputValue[1].value;
    nhanVien.name = inputValue[2].value;
    nhanVien.email = inputValue[3].value;
    nhanVien.password = inputValue[4].value;
    nhanVien.workday = inputValue[5].value;
    nhanVien.basicSalary = inputValue[6].value;
    nhanVien.workingHours = inputValue[7].value;
    nhanVien.position = selectValue.value;
    arrsNhanVien.push({ id: Date.now(), name: nhanVien} );
};
// Hàm render HTML
function renderArrs(inputArrs) {
    let content = "";
    inputArrs.forEach((nhanVien) => {
        content += `
        <tr>
            <td>${nhanVien.name.account}</td>
            <td>${nhanVien.name.name}</td>
            <td>${nhanVien.name.email}</td>
            <td>${nhanVien.name.workday}</td>
            <td>${nhanVien.name.position}</td>
            <td>${nhanVien.name.totalSalary(validatePosition(nhanVien.name.position), nhanVien.name.basicSalary).toLocaleString()}</td>
            <td>${nhanVien.name.ratings(nhanVien.name.workingHours)}</td>
            <td>
                <button onclick = "handleEdit(${nhanVien.id})" class="btn btn-success btnEdit" type="button">Edit</button> 
                <button onclick = "handleDelete(${nhanVien.id})" class="btn btn-danger btnDelete" type="button">Delete</button>
            </td>
        </tr>`;
    });
    list.innerHTML = content;
};
// Hàm resetValueInput
function resetValueInput() {
    inputValue[1].value = '';
    inputValue[2].value = '';
    inputValue[3].value = '';
    inputValue[4].value = '';
    inputValue[5].value = '';
    inputValue[6].value = '';
    inputValue[7].value = '';
    selectValue.value = 'Nhân viên';
    for ( let i = 0; i < inputValue.length; i++) {
        inputValue[i].style.borderColor = '#ced4da';
    }
}
// ======================== 7. Xóa nhân viên =============================

function handleDelete(id) {         // Hàm xử lý nút Delete
    // console.log(id);
    let indexNhanVien = arrsNhanVien.findIndex(function(todo) {
        return todo.id === id;
    });
    if (indexNhanVien !== -1) {
        arrsNhanVien.splice(indexNhanVien, 1);
        renderArrs(arrsNhanVien)
        // list.removeChild(list.children[indexNhanVien]);
        console.log(arrsNhanVien);
    }
}
// ======================== 8. Cập nhật thông tin nhân viên =============================

btnUpdate.onclick = () => {
    update();
    btnUpdate.classList.add('d-none'); 
    btnAdd.classList.remove('d-none')
    console.log(arrsNhanVien);
};
// Hàm mở tab lấy thông tin
function addNhanVien() {
    btnUpdate.classList.add('d-none');
    modal.style.zIndex = "20";
    modalMain.style.transform = "translateY(0)";
}
// Hàm xử lý nút Update
function update() {
    if (
        validateAccount(inputValue[1].value) &&
        validateName(inputValue[2].value) &&
        validateEmail(inputValue[3].value) &&
        validatePassword(inputValue[4].value) &&
        validateWorkday(inputValue[5].value) &&
        validateBasicSalary(inputValue[6].value) &&
        validateWorkingHours(inputValue[7].value)
    ) {
        editNhanVien = arrsNhanVien.find(function(todo) {return todo.id === editId}).name;        
        editNhanVien.account = inputValue[1].value;
        editNhanVien.name = inputValue[2].value;
        editNhanVien.email = inputValue[3].value;
        editNhanVien.password = inputValue[4].value;
        editNhanVien.workday = inputValue[5].value;
        editNhanVien.basicSalary = inputValue[6].value;
        editNhanVien.workingHours = inputValue[7].value;
        editNhanVien.position = selectValue.value;
        renderArrs(arrsNhanVien);
        alert('Chỉnh sửa thông tin thành công');
    } else {
        alert('Chỉnh sửa thông tin không thành công');
    }  
    resetValueInput();
}
// Hàm xử lý nút Edit
function handleEdit(id) {
    editId = id;
    addNhanVien();
    btnUpdate.classList.remove('d-none');
    btnAdd.classList.add('d-none')
    for ( let i = 0; i < inputValue.length; i++) {
        inputValue[i].style.borderColor = '#ced4da';
    }
    let editNhanVien = arrsNhanVien.find(function(todo) {return todo.id === id}).name;
    inputValue[1].value = editNhanVien.account ; 
    inputValue[2].value = editNhanVien.name ;
    inputValue[3].value = editNhanVien.email ;
    inputValue[4].value = editNhanVien.password ;
    inputValue[5].value = editNhanVien.workday ;
    inputValue[6].value = editNhanVien.basicSalary ;
    inputValue[7].value = editNhanVien.workingHours ;
    selectValue.value = editNhanVien.position;
}
// ======================== 9. Tìm Nhân Viên theo loại (xuất săc, giỏi, khá...) và hiển thị =============================
document.getElementById('btnSearch').onclick = () => {
    console.log(inputValue[0].value);
    if (inputValue[0].value === 'NVTB') {
        let loc = arrsNhanVien.filter((nhanVien) => {
            return nhanVien.name.ratings(nhanVien.name.workingHours) === 'NVTB';
        })
        renderArrs(loc);
    } else if (inputValue[0].value === 'NVK') {
        let loc = arrsNhanVien.filter((nhanVien) => {
            return nhanVien.name.ratings(nhanVien.name.workingHours) === 'NVK';
        })
        renderArrs(loc);
    } else if (inputValue[0].value === 'NVG') {
        let loc = arrsNhanVien.filter((nhanVien) => {
            return nhanVien.name.ratings(nhanVien.name.workingHours) === 'NVG';
        })
        renderArrs(loc);
    } else if (inputValue[0].value === 'NVXS') {
        let loc = arrsNhanVien.filter((nhanVien) => {
            return nhanVien.name.ratings(nhanVien.name.workingHours) === 'NVXS';
        })
        renderArrs(loc);
    } 
}
document.getElementById('blur').onblur = () => {
    renderArrs(arrsNhanVien);
}

