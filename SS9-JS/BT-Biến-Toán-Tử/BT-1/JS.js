
// Bài 1: Viết chương trình nhập điểm của một sinh viên cho các môn: Vật lý, Hóa học, và Sinh học.
// Sau đó hiển thị điểm trung bình và tổng của những điểm này.
{
    let sinh = Number(prompt("Nhập điểm môn sinh"));
    let toan = Number(prompt("Nhập điểm môn toán"));
    let hoa = Number(prompt("Nhập điểm môn hoá"));

    let sum = sinh + toan + hoa;
    let tbMon = (sinh + toan + hoa) / 3;

    alert("Tổng điểm các môn : " + sum + " Và " + "Điểm trung bình môn là :" + tbMon);
}