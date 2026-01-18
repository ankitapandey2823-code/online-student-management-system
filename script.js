const studentForm = document.getElementById('studentForm');
const studentTable = document.getElementById('studentTable');
const addButton = studentForm.querySelector('button');
const searchInput = document.getElementById('search');

let students = JSON.parse(localStorage.getItem('students')) || [];

function renderTable(filter = '') {
    studentTable.innerHTML = '';

    students
        .filter(s => s.name.toLowerCase().includes(filter) || s.roll.toLowerCase().includes(filter))
        .forEach((student, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.email}</td>
            <td>
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

        // Delete
        tr.querySelector('.delete-btn').addEventListener('click', function() {
            if(confirm('Are you sure to delete this student?')) {
                students.splice(index, 1);
                localStorage.setItem('students', JSON.stringify(students));
                renderTable(searchInput.value.trim().toLowerCase());
            }
        });

        // Edit
        tr.querySelector('.edit-btn').addEventListener('click', function() {
            document.getElementById('name').value = student.name;
            document.getElementById('roll').value = student.roll;
            document.getElementById('course').value = student.course;
            document.getElementById('email').value = student.email;

            students.splice(index, 1);
            localStorage.setItem('students', JSON.stringify(students));
            renderTable(searchInput.value.trim().toLowerCase());
        });

        studentTable.appendChild(tr);
    });
}

// Initial render
renderTable();

// Add student
addButton.addEventListener('click', function() {
    const name = document.getElementById('name').value.trim();
    const roll = document.getElementById('roll').value.trim();
    const course = document.getElementById('course').value.trim();
    const email = document.getElementById('email').value.trim();

    if(name === '' || roll === '' || course === '' || email === '') {
        alert('Please fill all fields');
        return;
    }

    students.push({name, roll, course, email});
    localStorage.setItem('students', JSON.stringify(students));

    renderTable(searchInput.value.trim().toLowerCase());
    studentForm.reset();
});

// Search
searchInput.addEventListener('input', function() {
    renderTable(searchInput.value.trim().toLowerCase());
});