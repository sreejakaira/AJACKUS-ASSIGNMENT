<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Employee Directory Web Interface</title>
    <link rel="stylesheet" href="/static/css/style.css">
</head>
<body>
    <div id="app">
        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header-content">
                    <div class="header-left">
                        <div class="logo">
                            <svg class="logo-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 21h18"></path>
                                <path d="M5 21V7l8-4v18"></path>
                                <path d="M19 21V11l-6-4"></path>
                            </svg>
                            <h1>Employee Directory</h1>
                        </div>
                        <div class="employee-count">
                            <svg class="count-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <span id="employee-count-text">12 Employees</span>
                        </div>
                    </div>
                    <button id="add-employee-btn" class="btn btn-primary">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                        Add Employee
                    </button>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="main-content">
            <div class="container">
                <!-- Search and Filter Controls -->
                <div class="controls-section">
                    <div class="search-container">
                        <div class="search-input-wrapper">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input type="text" id="search-input" placeholder="Search employees..." class="search-input">
                            <button id="clear-search" class="clear-search-btn" style="display: none;">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="filter-controls">
                        <button id="filter-btn" class="btn btn-secondary">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                            </svg>
                            Filters
                            <span id="filter-badge" class="filter-badge" style="display: none;">Active</span>
                        </button>
                    </div>
                </div>

                <!-- Sort Controls -->
                <div class="sort-controls">
                    <span class="sort-label">Sort by:</span>
                    <button class="sort-btn active" data-field="firstName" data-direction="asc">
                        First Name
                        <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5,12 12,5 19,12"></polyline>
                        </svg>
                    </button>
                    <button class="sort-btn" data-field="lastName" data-direction="asc">
                        Last Name
                        <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5,12 12,5 19,12"></polyline>
                        </svg>
                    </button>
                    <button class="sort-btn" data-field="department" data-direction="asc">
                        Department
                        <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5,12 12,5 19,12"></polyline>
                        </svg>
                    </button>
                    <button class="sort-btn" data-field="role" data-direction="asc">
                        Role
                        <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5,12 12,5 19,12"></polyline>
                        </svg>
                    </button>
                    <button class="sort-btn" data-field="joinDate" data-direction="asc">
                        Join Date
                        <svg class="sort-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="19" x2="12" y2="5"></line>
                            <polyline points="5,12 12,5 19,12"></polyline>
                        </svg>
                    </button>
                </div>

                <!-- Employee Grid -->
                <div id="employee-grid" class="employee-grid">
                    <!-- Employee cards will be populated here by JavaScript -->
                    <#list employees as employee>
                        <div class="employee-card" data-employee-id="${employee.id}">
                            <div class="employee-header">
                                <div class="employee-info">
                                    <img src="${employee.avatar!''}" alt="${employee.firstName} ${employee.lastName}" class="employee-avatar">
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
                                    <span>Joined ${employee.joinDate}</span>
                                </div>
                            </div>
                        </div>
                    </#list>
                </div>

                <!-- Pagination -->
                <div id="pagination" class="pagination">
                    <div class="pagination-info">
                        <span id="pagination-text">Showing 1 to 10 of 12 results</span>
                        <div class="items-per-page">
                            <label>Items per page:</label>
                            <select id="items-per-page">
                                <option value="5">5</option>
                                <option value="10" selected>10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                    <div class="pagination-controls">
                        <button id="prev-page" class="pagination-btn" disabled>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="15,18 9,12 15,6"></polyline>
                            </svg>
                        </button>
                        <div id="page-numbers" class="page-numbers">
                            <button class="page-btn active">1</button>
                            <button class="page-btn">2</button>
                        </div>
                        <button id="next-page" class="pagination-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9,18 15,12 9,6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </main>

        <!-- Filter Panel -->
        <div id="filter-panel" class="filter-panel">
            <div class="filter-content">
                <div class="filter-header">
                    <h3>Filters</h3>
                    <button id="close-filter" class="close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <div class="filter-body">
                    <div class="filter-group">
                        <label>Department</label>
                        <select id="filter-department">
                            <option value="">All Departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Sales">Sales</option>
                            <option value="HR">HR</option>
                            <option value="Finance">Finance</option>
                            <option value="Design">Design</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <label>Role</label>
                        <select id="filter-role">
                            <option value="">All Roles</option>
                            <option value="Senior Software Engineer">Senior Software Engineer</option>
                            <option value="Marketing Manager">Marketing Manager</option>
                            <option value="Sales Representative">Sales Representative</option>
                            <option value="HR Manager">HR Manager</option>
                            <option value="Financial Analyst">Financial Analyst</option>
                            <option value="UX Designer">UX Designer</option>
                            <option value="DevOps Engineer">DevOps Engineer</option>
                            <option value="Content Strategist">Content Strategist</option>
                            <option value="Sales Manager">Sales Manager</option>
                            <option value="Recruiter">Recruiter</option>
                            <option value="Accountant">Accountant</option>
                            <option value="Graphic Designer">Graphic Designer</option>
                        </select>
                    </div>
                </div>
                <div class="filter-footer">
                    <button id="clear-filters" class="btn btn-secondary">Clear Filters</button>
                    <button id="apply-filters" class="btn btn-primary">Apply Filters</button>
                </div>
            </div>
        </div>

        <!-- Employee Form Modal -->
        <div id="employee-form-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="modal-title">
                        <svg class="modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <h2 id="form-title">Add New Employee</h2>
                    </div>
                    <button id="close-modal" class="close-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
                <form id="employee-form" class="employee-form">
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" name="firstName" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" name="lastName" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="email">Email *</label>
                            <input type="email" id="email" name="email" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone *</label>
                            <input type="tel" id="phone" name="phone" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="department">Department *</label>
                            <select id="department" name="department" required>
                                <option value="">Select Department</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Sales">Sales</option>
                                <option value="HR">HR</option>
                                <option value="Finance">Finance</option>
                                <option value="Design">Design</option>
                            </select>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="role">Role *</label>
                            <select id="role" name="role" required>
                                <option value="">Select Role</option>
                                <option value="Senior Software Engineer">Senior Software Engineer</option>
                                <option value="Marketing Manager">Marketing Manager</option>
                                <option value="Sales Representative">Sales Representative</option>
                                <option value="HR Manager">HR Manager</option>
                                <option value="Financial Analyst">Financial Analyst</option>
                                <option value="UX Designer">UX Designer</option>
                                <option value="DevOps Engineer">DevOps Engineer</option>
                                <option value="Content Strategist">Content Strategist</option>
                                <option value="Sales Manager">Sales Manager</option>
                                <option value="Recruiter">Recruiter</option>
                                <option value="Accountant">Accountant</option>
                                <option value="Graphic Designer">Graphic Designer</option>
                            </select>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="joinDate">Join Date *</label>
                            <input type="date" id="joinDate" name="joinDate" required>
                            <div class="error-message"></div>
                        </div>
                        <div class="form-group">
                            <label for="avatar">Avatar URL (Optional)</label>
                            <input type="url" id="avatar" name="avatar">
                            <div class="error-message"></div>
                        </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancel-btn" class="btn btn-secondary">Cancel</button>
                        <button type="submit" class="btn btn-primary">
                            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                            </svg>
                            Save Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Overlay -->
        <div id="overlay" class="overlay"></div>
    </div>

    <!-- Scripts -->
    <script>
        // Pass Freemarker data to JavaScript
        <#assign employeeData = employees>
        window.initialEmployees = [
            <#list employeeData as employee>
                {
                    id: ${employee.id},
                    firstName: "${employee.firstName}",
                    lastName: "${employee.lastName}",
                    email: "${employee.email}",
                    phone: "${employee.phone}",
                    department: "${employee.department}",
                    role: "${employee.role}",
                    joinDate: "${employee.joinDate}",
                    avatar: "${employee.avatar!''}"
                }<#if employee_has_next>,</#if>
            </#list>
        ];
    </script>
    <script src="/static/js/data.js"></script>
    <script src="/static/js/app.js"></script>
</body>
</html>