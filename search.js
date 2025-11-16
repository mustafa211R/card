document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const getIdBtn = document.getElementById("getIdBtn");
    const closeModal = document.getElementById("closeModal");
    const downloadBtn = document.getElementById("downloadBtn");
    const statusMsg = document.getElementById("statusMsg");
    const schoolSelect = document.getElementById("schoolSelect");

    let studentsData = [];

    // تحميل JSON عند فتح الصفحة
    fetch('students.json')
        .then(res => res.json())
        .then(data => {
            studentsData = data;
        })
        .catch(() => {
            statusMsg.textContent = "تعذر تحميل بيانات الطلاب.";
        });

    getIdBtn.addEventListener("click", () => {
        modal.classList.remove("hidden");
        statusMsg.textContent = "";
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    downloadBtn.addEventListener("click", () => {
        const nameInput = document.getElementById("studentName").value.trim();
        const school = schoolSelect.value;

        if (!nameInput) {
            statusMsg.textContent = "يرجى إدخال الاسم.";
            return;
        }

        // البحث في JSON مع مرونة الفراغات
        const student = studentsData.find(s => 
            s.school === school &&
            s.name.replace(/\s+/g,'') === nameInput.replace(/\s+/g,'')
        );

        if (student) {
            const filePath = encodeURI(student.path); // ترميز URI للملفات العربية
            const link = document.createElement("a");
            link.href = filePath;
            link.download = student.name + ".pdf";
            link.click();
            statusMsg.textContent = "";
        } else {
            statusMsg.textContent = "الهوية غير موجودة، يرجى التواصل مع الإدارة.";
        }

        // حفظ الاسم والمدرسة في localStorage
        localStorage.setItem("studentName", nameInput);
        localStorage.setItem("school", school);
    });
});
