const mockEmployees = [
    {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@company.com',
        department: 'Engineering',
        role: 'Senior Software Engineer',
        joinDate: '2022-01-15',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@company.com',
        department: 'Marketing',
        role: 'Marketing Manager',
        joinDate: '2021-03-20',
        phone: '+1 (555) 234-5678',
        avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 3,
        firstName: 'Mike',
        lastName: 'Johnson',
        email: 'mike.johnson@company.com',
        department: 'Sales',
        role: 'Sales Representative',
        joinDate: '2023-05-10',
        phone: '+1 (555) 345-6789',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 4,
        firstName: 'Sarah',
        lastName: 'Wilson',
        email: 'sarah.wilson@company.com',
        department: 'HR',
        role: 'HR Manager',
        joinDate: '2020-11-01',
        phone: '+1 (555) 456-7890',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 5,
        firstName: 'David',
        lastName: 'Brown',
        email: 'david.brown@company.com',
        department: 'Finance',
        role: 'Financial Analyst',
        joinDate: '2022-08-15',
        phone: '+1 (555) 567-8901',
        avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 6,
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        department: 'Design',
        role: 'UX Designer',
        joinDate: '2023-02-01',
        phone: '+1 (555) 678-9012',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 7,
        firstName: 'Robert',
        lastName: 'Miller',
        email: 'robert.miller@company.com',
        department: 'Engineering',
        role: 'DevOps Engineer',
        joinDate: '2021-09-12',
        phone: '+1 (555) 789-0123',
        avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 8,
        firstName: 'Lisa',
        lastName: 'Garcia',
        email: 'lisa.garcia@company.com',
        department: 'Marketing',
        role: 'Content Strategist',
        joinDate: '2022-12-05',
        phone: '+1 (555) 890-1234',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 9,
        firstName: 'Chris',
        lastName: 'Anderson',
        email: 'chris.anderson@company.com',
        department: 'Sales',
        role: 'Sales Manager',
        joinDate: '2020-06-18',
        phone: '+1 (555) 901-2345',
        avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 10,
        firstName: 'Amanda',
        lastName: 'Taylor',
        email: 'amanda.taylor@company.com',
        department: 'HR',
        role: 'Recruiter',
        joinDate: '2023-01-20',
        phone: '+1 (555) 012-3456',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 11,
        firstName: 'Kevin',
        lastName: 'White',
        email: 'kevin.white@company.com',
        department: 'Finance',
        role: 'Accountant',
        joinDate: '2021-07-22',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
        id: 12,
        firstName: 'Michelle',
        lastName: 'Lee',
        email: 'michelle.lee@company.com',
        department: 'Design',
        role: 'Graphic Designer',
        joinDate: '2022-04-10',
        phone: '+1 (555) 234-5678',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
];

// If initial employees from Freemarker are available, use them; otherwise, use mock data
if (typeof window !== 'undefined' && window.initialEmployees) {
    // Use data from Freemarker
    window.employees = window.initialEmployees;
} else {
    // Fallback to mock data
    window.employees = mockEmployees;
}

// Department and Role options
const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design'];
const roles = [
    'Senior Software Engineer', 'Marketing Manager', 'Sales Representative', 
    'HR Manager', 'Financial Analyst', 'UX Designer', 'DevOps Engineer', 
    'Content Strategist', 'Sales Manager', 'Recruiter', 'Accountant', 'Graphic Designer'
];