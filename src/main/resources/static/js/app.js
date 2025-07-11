// Employee Directory Application
class EmployeeDirectory {
    constructor() {
        this.employees = [...window.employees];
        this.filteredEmployees = [...this.employees];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.currentSort = { field: 'firstName', direction: 'asc' };
        this.filters = { department: '', role: '' };
        this.searchTerm = '';
        this.editingEmployee = null;

        this.initializeElements();
        this.bindEvents();
        this.render();
    }

    initializeElements() {
        // Main elements
        this.employeeGrid = document.getElementById('employee-grid');
        this.employeeCountText = document.getElementById('employee-count-text');
        this.searchInput = document.getElementById('search-input');
        this.clearSearchBtn = document.getElementById('clear-search');
        
        // Modal elements
        this.modal = document.getElementById('employee-form-modal');
        this.overlay = document.getElementById('overlay');
        this.employeeForm = document.getElementById('employee-form');
        this.formTitle = document.getElementById('form-title');
        
        // Filter elements
        this.filterPanel = document.getElementById('filter-panel');
        this.filterBtn = document.getElementById('filter-btn');
        this.filterBadge = document.getElementById('filter-badge');
        this.filterDepartment = document.getElementById('filter-department');
        this.filterRole = document.getElementById('filter-role');
        
        // Pagination elements
        this.paginationText = document.getElementById('pagination-text');
        this.itemsPerPageSelect = document.getElementById('items-per-page');
        this.pageNumbers = document.getElementById('page-numbers');
        this.prevPageBtn = document.getElementById('prev-page');
        this.nextPageBtn = document.getElementById('next-page');
        
        // Sort buttons
        this.sortButtons = document.querySelectorAll('.sort-btn');
    }

    bindEvents() {
        // Add employee button
        document.getElementById('add-employee-btn').addEventListener('click', () => {
            this.openModal();
        });

        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.applyFiltersAndSearch();
            this.toggleClearSearch();
        });

        this.clearSearchBtn.addEventListener('click', () => {
            this.searchInput.value = '';
            this.searchTerm = '';
            this.currentPage = 1;
            this.applyFiltersAndSearch();
            this.toggleClearSearch();
        });

        // Filter functionality
        this.filterBtn.addEventListener('click', () => {
            this.toggleFilterPanel();
        });

        document.getElementById('close-filter').addEventListener('click', () => {
            this.closeFilterPanel();
        });

        document.getElementById('apply-filters').addEventListener('click', () => {
            this.applyFilters();
        });

        document.getElementById('clear-filters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Sort functionality
        this.sortButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.handleSort(btn);
            });
        });

        // Pagination
        this.itemsPerPageSelect.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderPagination();
            this.renderEmployees();
        });

        this.prevPageBtn.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderPagination();
                this.renderEmployees();
            }
        });

        this.nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderPagination();
                this.renderEmployees();
            }
        });

        // Modal functionality
        document.getElementById('close-modal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('cancel-btn').addEventListener('click', () => {
            this.closeModal();
        });

        this.overlay.addEventListener('click', () => {
            this.closeModal();
            this.closeFilterPanel();
        });

        // Form submission
        this.employeeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Employee grid events (using event delegation)
        this.employeeGrid.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.edit-btn');
            const deleteBtn = e.target.closest('.delete-btn');
            
            if (editBtn) {
                const employeeId = parseInt(editBtn.dataset.id);
                this.editEmployee(employeeId);
            } else if (deleteBtn) {
                const employeeId = parseInt(deleteBtn.dataset.id);
                this.deleteEmployee(employeeId);
            }
        });
    }

    toggleClearSearch() {
        this.clearSearchBtn.style.display = this.searchTerm ? 'block' : 'none';
    }

    toggleFilterPanel() {
        this.filterPanel.classList.toggle('active');
        this.overlay.classList.toggle('active');
    }

    closeFilterPanel() {
        this.filterPanel.classList.remove('active');
        this.overlay.classList.remove('active');
    }

    applyFilters() {
        this.filters.department = this.filterDepartment.value;
        this.filters.role = this.filterRole.value;
        this.currentPage = 1;
        this.applyFiltersAndSearch();
        this.updateFilterBadge();
        this.closeFilterPanel();
    }

    clearFilters() {
        this.filterDepartment.value = '';
        this.filterRole.value = '';
        this.filters = { department: '', role: '' };
        this.currentPage = 1;
        this.applyFiltersAndSearch();
        this.updateFilterBadge();
    }

    updateFilterBadge() {
        const hasActiveFilters = this.filters.department || this.filters.role;
        this.filterBadge.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }

    applyFiltersAndSearch() {
        let filtered = [...this.employees];

        // Apply search
        if (this.searchTerm) {
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(this.searchTerm) ||
                emp.lastName.toLowerCase().includes(this.searchTerm) ||
                emp.email.toLowerCase().includes(this.searchTerm) ||
                emp.department.toLowerCase().includes(this.searchTerm) ||
                emp.role.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply filters
        if (this.filters.department) {
            filtered = filtered.filter(emp => emp.department === this.filters.department);
        }

        if (this.filters.role) {
            filtered = filtered.filter(emp => emp.role === this.filters.role);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const aValue = a[this.currentSort.field];
            const bValue = b[this.currentSort.field];
            
            const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            return this.currentSort.direction === 'asc' ? comparison : -comparison;
        });

        this.filteredEmployees = filtered;
        this.renderPagination();
        this.renderEmployees();
        this.updateEmployeeCount();
    }

    handleSort(button) {
        const field = button.dataset.field;
        const currentDirection = button.dataset.direction;
        const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
        
        // Update sort state
        this.currentSort = { field, direction: newDirection };
        
        // Update button states
        this.sortButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.dataset.direction = 'asc';
            const icon = btn.querySelector('.sort-icon');
            icon.style.transform = 'rotate(0deg)';
        });
        
        button.classList.add('active');
        button.dataset.direction = newDirection;
        const icon = button.querySelector('.sort-icon');
        icon.style.transform = newDirection === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)';
        
        this.applyFiltersAndSearch();
    }

    openModal(employee = null) {
        this.editingEmployee = employee;
        this.formTitle.textContent = employee ? 'Edit Employee' : 'Add New Employee';
        
        if (employee) {
            this.populateForm(employee);
        } else {
            this.clearForm();
        }
        
        this.modal.classList.add('active');
        this.overlay.classList.add('active');
    }

    closeModal() {
        this.modal.classList.remove('active');
        this.overlay.classList.remove('active');
        this.editingEmployee = null;
        this.clearForm();
    }

    populateForm(employee) {
        document.getElementById('firstName').value = employee.firstName;
        document.getElementById('lastName').value = employee.lastName;
        document.getElementById('email').value = employee.email;
        document.getElementById('phone').value = employee.phone;
        document.getElementById('department').value = employee.department;
        document.getElementById('role').value = employee.role;
        document.getElementById('joinDate').value = employee.joinDate;
        document.getElementById('avatar').value = employee.avatar || '';
    }

    clearForm() {
        this.employeeForm.reset();
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('joinDate').value = today;
        this.clearFormErrors();
    }

    clearFormErrors() {
        const errorElements = this.employeeForm.querySelectorAll('.error-message');
        errorElements.forEach(el => {
            el.textContent = '';
            el.parentElement.classList.remove('error');
        });
    }

    validateForm() {
        const errors = {};
        const formData = new FormData(this.employeeForm);
        
        // Required field validation
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'department', 'role', 'joinDate'];
        requiredFields.forEach(field => {
            if (!formData.get(field)?.trim()) {
                errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        // Email validation
        const email = formData.get('email');
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        // Phone validation
        const phone = formData.get('phone');
        if (phone && !/^\+?[\d\s()-]{10,}$/.test(phone)) {
            errors.phone = 'Please enter a valid phone number';
        }

        // URL validation for avatar
        const avatar = formData.get('avatar');
        if (avatar && !/^https?:\/\/.+/.test(avatar)) {
            errors.avatar = 'Please enter a valid URL';
        }

        // Display errors
        this.displayFormErrors(errors);
        
        return Object.keys(errors).length === 0;
    }

    displayFormErrors(errors) {
        this.clearFormErrors();
        
        Object.keys(errors).forEach(field => {
            const input = document.getElementById(field);
            const errorElement = input.parentElement.querySelector('.error-message');
            
            input.parentElement.classList.add('error');
            errorElement.textContent = errors[field];
        });
    }

    handleFormSubmit() {
        if (!this.validateForm()) {
            return;
        }

        const formData = new FormData(this.employeeForm);
        const employeeData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            department: formData.get('department'),
            role: formData.get('role'),
            joinDate: formData.get('joinDate'),
            avatar: formData.get('avatar') || this.getDefaultAvatar()
        };

        if (this.editingEmployee) {
            this.updateEmployee(this.editingEmployee.id, employeeData);
        } else {
            this.addEmployee(employeeData);
        }

        this.closeModal();
    }

    getDefaultAvatar() {
        const defaultAvatars = [
            'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
            'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
        ];
        return defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)];
    }

    addEmployee(employeeData) {
        const newEmployee = {
            id: Math.max(...this.employees.map(e => e.id), 0) + 1,
            ...employeeData
        };
        
        this.employees.push(newEmployee);
        this.applyFiltersAndSearch();
        this.showNotification('Employee added successfully!', 'success');
    }

    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            this.employees[index] = { id, ...employeeData };
            this.applyFiltersAndSearch();
            this.showNotification('Employee updated successfully!', 'success');
        }
    }

    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.openModal(employee);
        }
    }

    deleteEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee && confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.applyFiltersAndSearch();
            this.showNotification('Employee deleted successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    renderEmployees() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentEmployees = this.filteredEmployees.slice(startIndex, endIndex);

        this.employeeGrid.innerHTML = currentEmployees.map(employee => `
            <div class="employee-card" data-employee-id="${employee.id}">
                <div class="employee-header">
                    <div class="employee-info">
                        <img src="${employee.avatar || this.getDefaultAvatar()}" alt="${employee.firstName} ${employee.lastName}" class="employee-avatar">
                        <div class="employee-details">
                            <h3 class="employee-name">${employee.firstName} ${employee.lastName}</h3>
                            <p class="employee-role">${employee.role}</p>
                            <p class="employee-department">${employee.department}</p>
                        </div>
                    </div>
                    <div class="employee-actions">
                        <button class="action-btn edit-btn" data-id="${employee.id}" title="Edit Employee">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                        <button class="action-btn delete-btn" data-id="${employee.id}" title="Delete Employee">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3,6 5,6 21,6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="employee-contact">
                    <div class="contact-item">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>${employee.email}</span>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <span>${employee.phone}</span>
                    </div>
                    <div class="contact-item">
                        <svg class="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        <span>Joined ${new Date(employee.joinDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        const startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, this.filteredEmployees.length);

        // Update pagination text
        this.paginationText.textContent = this.filteredEmployees.length > 0 
            ? `Showing ${startItem} to ${endItem} of ${this.filteredEmployees.length} results`
            : 'No employees found';

        // Update page numbers
        this.pageNumbers.innerHTML = this.generatePageNumbers(totalPages);

        // Update navigation buttons
        this.prevPageBtn.disabled = this.currentPage === 1;
        this.nextPageBtn.disabled = this.currentPage === totalPages || totalPages === 0;

        // Bind page number events
        this.pageNumbers.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active') && !btn.disabled) {
                    this.currentPage = parseInt(btn.textContent);
                    this.renderPagination();
                    this.renderEmployees();
                }
            });
        });
    }

    generatePageNumbers(totalPages) {
        if (totalPages <= 1) return '<button class="page-btn active">1</button>';

        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(`<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`);
            }
        } else {
            if (this.currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(`<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`);
                }
                pages.push('<button class="page-btn" disabled>...</button>');
                pages.push(`<button class="page-btn">${totalPages}</button>`);
            } else if (this.currentPage >= totalPages - 2) {
                pages.push('<button class="page-btn">1</button>');
                pages.push('<button class="page-btn" disabled>...</button>');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(`<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`);
                }
            } else {
                pages.push('<button class="page-btn">1</button>');
                pages.push('<button class="page-btn" disabled>...</button>');
                for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
                    pages.push(`<button class="page-btn ${i === this.currentPage ? 'active' : ''}">${i}</button>`);
                }
                pages.push('<button class="page-btn" disabled>...</button>');
                pages.push(`<button class="page-btn">${totalPages}</button>`);
            }
        }

        return pages.join('');
    }

    updateEmployeeCount() {
        const count = this.filteredEmployees.length;
        this.employeeCountText.textContent = `${count} ${count === 1 ? 'Employee' : 'Employees'}`;
    }

    render() {
        this.applyFiltersAndSearch();
        this.updateFilterBadge();
        this.toggleClearSearch();
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmployeeDirectory();
});