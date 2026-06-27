const taskNameInput = document.querySelector('.main-one input');
const taskContentInput = document.querySelector('.main-two input');
const addBtn = document.querySelector('.btns button');
const addsContainer = document.getElementById('adds');

addBtn.addEventListener('click', () => {
    const name = taskNameInput.value.trim();
    const content = taskContentInput.value.trim();

    if (name === "" || content === "") {
        alert("برجاء إدخال الاسم والمحتوى أولاً!");
        return;
    }

    addBtn.innerText = "Processing...";
    
    setTimeout(() => {
        createTask(name, content);
        taskNameInput.value = "";
        taskContentInput.value = "";
        addBtn.innerText = "adding new task";
        
        if(addsContainer.innerHTML.includes("there is no tasks to show")) {
            addsContainer.innerHTML = "";
        }
    }, 2000);
});

function createTask(name, content) {
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    taskCard.innerHTML = `
        <div class="task-main-row">
            <div class="info">
                <h3 class="t-name">${name}</h3>
                <p class="t-content">${content}</p>
            </div>
            <span class="arrow-toggle">↓</span>
        </div>

        <div class="control-layer hidden">
            <button class="delete-btn">delete</button>
            <button class="update-trigger">update</button>
        </div>

        <div class="edit-layer hidden">
            <div class="edit-inputs">
                <div class="input-group">
                    <label>taskName:</label>
                    <input type="text" class="edit-name" value="${name}">
                </div>
                <div class="input-group">
                    <label>taskContent:</label>
                    <input type="text" class="edit-content" value="${content}">
                </div>
                <button class="save-change-btn">change the data</button>
            </div>
            <span class="close-edit">×</span>
        </div>
    `;

    addsContainer.appendChild(taskCard);

    // --- البرمجة التفاعلية داخل الكارت ---

    const arrow = taskCard.querySelector('.arrow-toggle');
    const controlLayer = taskCard.querySelector('.control-layer');
    const updateBtn = taskCard.querySelector('.update-trigger');
    const editLayer = taskCard.querySelector('.edit-layer');
    const closeEdit = taskCard.querySelector('.close-edit');
    const saveBtn = taskCard.querySelector('.save-change-btn');

    // 1. ضغطة السهم (إظهار/إخفاء أزرار التحكم)
    arrow.onclick = () => {
        controlLayer.classList.toggle('hidden');
        arrow.style.transform = controlLayer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    };

    // 2. ضغطة Update (تظهر واجهة التعديل بعد ثانيتين)
    updateBtn.onclick = () => {
        updateBtn.innerText = "Loading...";
        setTimeout(() => {
            editLayer.classList.remove('hidden');
            updateBtn.innerText = "update";
        }, 2000);
    };

    // 3. سهم إغلاق التعديل (الـ X الجانبي)
    closeEdit.onclick = () => {
        editLayer.classList.add('hidden');
    };

    // 4. زر حفظ التعديلات
    saveBtn.onclick = () => {
        const newName = taskCard.querySelector('.edit-name').value;
        const newContent = taskCard.querySelector('.edit-content').value;
        
        saveBtn.innerText = "Updating...";
        setTimeout(() => {
            taskCard.querySelector('.t-name').innerText = newName;
            taskCard.querySelector('.t-content').innerText = newContent;
            editLayer.classList.add('hidden');
            saveBtn.innerText = "change the data";
        }, 2000);
    };

    // 5. زر الحذف
    taskCard.querySelector('.delete-btn').onclick = () => {
        taskCard.style.opacity = '0';
        setTimeout(() => taskCard.remove(), 500);
    };
}