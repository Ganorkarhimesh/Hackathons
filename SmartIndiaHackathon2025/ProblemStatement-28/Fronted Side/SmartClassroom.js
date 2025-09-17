document.addEventListener('DOMContentLoaded', function() {
            const authContainer = document.getElementById('authContainer');
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            const showLoginBtn = document.getElementById('showLogin');
            const showRegisterBtn = document.getElementById('showRegister');
            const switchToLogin = document.getElementById('switchToLogin');
            const switchToRegister = document.getElementById('switchToRegister');
            const loginBtn = document.getElementById('loginBtn');
            const registerBtn = document.getElementById('registerBtn');
            const authTabs = document.querySelectorAll('.auth-tab');
            const authButtons = document.getElementById('authButtons');
            const userMenu = document.getElementById('userMenu');
            const userAvatar = document.getElementById('userAvatar');
            const userName = document.getElementById('userName');
            const logoutBtn = document.getElementById('logoutBtn');
            
            let currentUser = null;
            
            showLoginBtn.addEventListener('click', function() {
                authContainer.style.display = 'block';
                showForm('login');
            });
            
            showRegisterBtn.addEventListener('click', function() {
                authContainer.style.display = 'block';
                showForm('register');
            });
            
            switchToLogin.addEventListener('click', function() {
                showForm('login');
            });
            
            switchToRegister.addEventListener('click', function() {
                showForm('register');
            });
            
            authTabs.forEach(tab => {
                tab.addEventListener('click', function() {
                    const tabName = this.getAttribute('data-tab');
                    showForm(tabName);
                });
            });
            
            function showForm(formName) {
                if (formName === 'login') {
                    loginForm.classList.add('active');
                    registerForm.classList.remove('active');
                    authTabs[0].classList.add('active');
                    authTabs[1].classList.remove('active');
                } else {
                    loginForm.classList.remove('active');
                    registerForm.classList.add('active');
                    authTabs[0].classList.remove('active');
                    authTabs[1].classList.add('active');
                }
            }
            
            loginBtn.addEventListener('click', function() {
                const email = document.getElementById('loginEmail').value;
                const password = document.getElementById('loginPassword').value;
                
                if (!email || !password) {
                    alert('Please fill in all fields');
                    return;
                }
                
                currentUser = {
                    name: email.split('@')[0],
                    email: email
                };
                
                authContainer.style.display = 'none';
                authButtons.style.display = 'none';
                userMenu.style.display = 'flex';
                userName.textContent = currentUser.name;
                userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
                
                alert('Login successful! Welcome ' + currentUser.name);
            });
            
            registerBtn.addEventListener('click', function() {
                const name = document.getElementById('registerName').value;
                const email = document.getElementById('registerEmail').value;
                const password = document.getElementById('registerPassword').value;
                const confirmPassword = document.getElementById('registerConfirmPassword').value;
                const studentId = document.getElementById('registerStudentId').value;
                
                if (!name || !email || !password || !confirmPassword || !studentId) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (password !== confirmPassword) {
                    alert('Passwords do not match');
                    return;
                }
                
                currentUser = {
                    name: name,
                    email: email,
                    studentId: studentId
                };
                
                authContainer.style.display = 'none';
                authButtons.style.display = 'none';
                userMenu.style.display = 'flex';
                userName.textContent = currentUser.name;
                userAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
                
                alert('Registration successful! Welcome ' + currentUser.name);
            });
            
            logoutBtn.addEventListener('click', function() {
                currentUser = null;
                authButtons.style.display = 'flex';
                userMenu.style.display = 'none';
                alert('You have been logged out');
            });
            
            document.addEventListener('click', function(event) {
                if (!authContainer.contains(event.target) && 
                    event.target !== showLoginBtn && 
                    event.target !== showRegisterBtn) {
                    authContainer.style.display = 'none';
                }
            });
            
            const scheduleButtons = document.querySelectorAll('.btn-primary');
            
            scheduleButtons.forEach(button => {
                if (button.id !== 'loginBtn' && button.id !== 'registerBtn') {
                    button.addEventListener('click', function() {
                        const buttonText = this.textContent;
                        
                        if (buttonText === 'Schedule Class') {
                            alert('Class scheduled successfully!');
                        } else if (buttonText === 'Optimize Timetable') {
                            alert('Timetable optimization completed!');
                        } else if (buttonText === 'Export Timetable') {
                            alert('Timetable exported to PDF format!');
                        }
                    });
                }
            });
            
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', function() {
                    const itemText = this.textContent;
                    alert(`Navigating to ${itemText} section`);
                });
            });
            
            const classItems = document.querySelectorAll('.class-item');
            
            classItems.forEach(item => {
                item.addEventListener('click', function() {
                    const className = this.querySelector('.class-name').textContent;
                    alert(`Viewing details for ${className}`);
                });
            });
        });