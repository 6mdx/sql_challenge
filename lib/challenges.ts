import { Signal, SignalHigh, SignalMedium, LucideIcon } from "lucide-react";
import { QueryExecResult } from "sql.js";

type ChallengeDifficulty = "Easy" | "Medium" | "Hard";

type ChallengeTable = {
    name: string;
    description: string;
    columns: Array<{ name: string; type: string; note?: string }>;
    values: Array<Record<string, string | number | null>>;
};


type SqlJSResponse = QueryExecResult[];

export type ChallengeContent = {
    slug: string;
    title: string;
    difficulty: ChallengeDifficulty;
    description: string;
    requirements: string[];
    tables: ChallengeTable[];
    sqlTemplate: string;
    defaultQuery: string;
    expectedResult: SqlJSResponse;
};

export const DIFFICULTY_TOKEN: Record<ChallengeDifficulty, { label: string; badge: "success" | "warning" | "destructive", Icon: LucideIcon }> = {
    Easy: { label: "Easy", badge: "success" , Icon: SignalMedium },
    Medium: { label: "Medium", badge: "warning", Icon: SignalHigh },
    Hard: { label: "Hard", badge: "destructive", Icon: Signal },
};

export const CHALLENGE_CATALOG: Array<ChallengeContent> = [
    // EASY CHALLENGES
    {
        slug: "challenge-1",
        title: "Challenge #1 – Select All Products",
        difficulty: "Easy",
        description:
            "Retrieve all products from the products table. This is a basic SELECT query to get familiar with querying data.",
        requirements: [
            "Return all columns from the products table.",
            "Return all rows without any filtering.",
            "No specific ordering required.",
        ],
        tables: [
            {
                name: "products",
                description: "Contains product information.",
                columns: [
                    { name: "product_id", type: "INT", note: "Primary key" },
                    { name: "product_name", type: "VARCHAR", note: "Product name" },
                    { name: "price", type: "DECIMAL", note: "Product price" },
                    { name: "category", type: "VARCHAR", note: "Product category" },
                ],
                values: [
                    { product_id: 1, product_name: "Laptop", price: 999.99, category: "Electronics" },
                    { product_id: 2, product_name: "Mouse", price: 25.50, category: "Electronics" },
                    { product_id: 3, product_name: "Desk", price: 299.00, category: "Furniture" },
                    { product_id: 4, product_name: "Chair", price: 150.00, category: "Furniture" },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE products (
                product_id INT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                category VARCHAR(50) NOT NULL
            );

            INSERT INTO products (product_id, product_name, price, category) VALUES
            (1, 'Laptop', 999.99, 'Electronics'),
            (2, 'Mouse', 25.50, 'Electronics'),
            (3, 'Desk', 299.00, 'Furniture'),
            (4, 'Chair', 150.00, 'Furniture');

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["product_id", "product_name", "price", "category"],
                values: [
                    [1, "Laptop", 999.99, "Electronics"],
                    [2, "Mouse", 25.50, "Electronics"],
                    [3, "Desk", 299.00, "Furniture"],
                    [4, "Chair", 150.00, "Furniture"],
                ],
            },
        ]
    },
    {
        slug: "challenge-2",
        title: "Challenge #2 – Count Employees",
        difficulty: "Easy",
        description:
            "Count the total number of employees in the company.",
        requirements: [
            "Return a single column named 'total_employees'.",
            "Use the COUNT function to count all rows.",
        ],
        tables: [
            {
                name: "employees",
                description: "Contains employee information.",
                columns: [
                    { name: "employee_id", type: "INT", note: "Primary key" },
                    { name: "employee_name", type: "VARCHAR", note: "Employee name" },
                    { name: "department", type: "VARCHAR", note: "Department name" },
                    { name: "salary", type: "DECIMAL", note: "Annual salary" },
                ],
                values: [
                    { employee_id: 1, employee_name: "John Doe", department: "Engineering", salary: 75000 },
                    { employee_id: 2, employee_name: "Jane Smith", department: "Marketing", salary: 65000 },
                    { employee_id: 3, employee_name: "Bob Johnson", department: "Engineering", salary: 80000 },
                    { employee_id: 4, employee_name: "Alice Brown", department: "HR", salary: 60000 },
                    { employee_id: 5, employee_name: "Charlie Wilson", department: "Sales", salary: 70000 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE employees (
                employee_id INT PRIMARY KEY,
                employee_name VARCHAR(100) NOT NULL,
                department VARCHAR(50) NOT NULL,
                salary DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO employees (employee_id, employee_name, department, salary) VALUES
            (1, 'John Doe', 'Engineering', 75000),
            (2, 'Jane Smith', 'Marketing', 65000),
            (3, 'Bob Johnson', 'Engineering', 80000),
            (4, 'Alice Brown', 'HR', 60000),
            (5, 'Charlie Wilson', 'Sales', 70000);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["total_employees"],
                values: [[5]],
            },
        ]
    },
    {
        slug: "challenge-3",
        title: "Challenge #3 – Filter by Price",
        difficulty: "Easy",
        description:
            "Find all products that cost less than $100.",
        requirements: [
            "Return columns: product_name, price.",
            "Filter for products with price less than 100.",
            "Order by price ascending.",
        ],
        tables: [
            {
                name: "products",
                description: "Contains product catalog.",
                columns: [
                    { name: "product_id", type: "INT", note: "Primary key" },
                    { name: "product_name", type: "VARCHAR", note: "Product name" },
                    { name: "price", type: "DECIMAL", note: "Product price" },
                ],
                values: [
                    { product_id: 1, product_name: "Keyboard", price: 45.99 },
                    { product_id: 2, product_name: "Monitor", price: 249.99 },
                    { product_id: 3, product_name: "Mouse Pad", price: 12.50 },
                    { product_id: 4, product_name: "USB Cable", price: 8.99 },
                    { product_id: 5, product_name: "Webcam", price: 89.99 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE products (
                product_id INT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO products (product_id, product_name, price) VALUES
            (1, 'Keyboard', 45.99),
            (2, 'Monitor', 249.99),
            (3, 'Mouse Pad', 12.50),
            (4, 'USB Cable', 8.99),
            (5, 'Webcam', 89.99);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["product_name", "price"],
                values: [
                    ["USB Cable", 8.99],
                    ["Mouse Pad", 12.50],
                    ["Keyboard", 45.99],
                    ["Webcam", 89.99],
                ],
            },
        ]
    },
    {
        slug: "challenge-4",
        title: "Challenge #4 – Find Specific Customer",
        difficulty: "Easy",
        description:
            "Retrieve customer information for customers whose email ends with '@gmail.com'.",
        requirements: [
            "Return columns: customer_id, customer_name, email.",
            "Filter for emails ending with '@gmail.com'.",
            "Order by customer_name alphabetically.",
        ],
        tables: [
            {
                name: "customers",
                description: "Contains customer contact information.",
                columns: [
                    { name: "customer_id", type: "INT", note: "Primary key" },
                    { name: "customer_name", type: "VARCHAR", note: "Full name" },
                    { name: "email", type: "VARCHAR", note: "Email address" },
                ],
                values: [
                    { customer_id: 1, customer_name: "Alice Johnson", email: "alice@gmail.com" },
                    { customer_id: 2, customer_name: "Bob Smith", email: "bob@yahoo.com" },
                    { customer_id: 3, customer_name: "Carol White", email: "carol@gmail.com" },
                    { customer_id: 4, customer_name: "David Brown", email: "david@outlook.com" },
                    { customer_id: 5, customer_name: "Eve Davis", email: "eve@gmail.com" },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE customers (
                customer_id INT PRIMARY KEY,
                customer_name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL
            );

            INSERT INTO customers (customer_id, customer_name, email) VALUES
            (1, 'Alice Johnson', 'alice@gmail.com'),
            (2, 'Bob Smith', 'bob@yahoo.com'),
            (3, 'Carol White', 'carol@gmail.com'),
            (4, 'David Brown', 'david@outlook.com'),
            (5, 'Eve Davis', 'eve@gmail.com');

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["customer_id", "customer_name", "email"],
                values: [
                    [1, "Alice Johnson", "alice@gmail.com"],
                    [3, "Carol White", "carol@gmail.com"],
                    [5, "Eve Davis", "eve@gmail.com"],
                ],
            },
        ]
    },
    {
        slug: "challenge-5",
        title: "Challenge #5 – Average Salary by Department",
        difficulty: "Easy",
        description:
            "Calculate the average salary for each department.",
        requirements: [
            "Return columns: department, avg_salary.",
            "Group results by department.",
            "Round average salary to 2 decimal places.",
            "Order by department name alphabetically.",
        ],
        tables: [
            {
                name: "employees",
                description: "Contains employee salary information.",
                columns: [
                    { name: "employee_id", type: "INT", note: "Primary key" },
                    { name: "employee_name", type: "VARCHAR", note: "Employee name" },
                    { name: "department", type: "VARCHAR", note: "Department" },
                    { name: "salary", type: "DECIMAL", note: "Annual salary" },
                ],
                values: [
                    { employee_id: 1, employee_name: "John", department: "Sales", salary: 50000 },
                    { employee_id: 2, employee_name: "Jane", department: "Engineering", salary: 75000 },
                    { employee_id: 3, employee_name: "Bob", department: "Sales", salary: 55000 },
                    { employee_id: 4, employee_name: "Alice", department: "Engineering", salary: 80000 },
                    { employee_id: 5, employee_name: "Charlie", department: "HR", salary: 60000 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE employees (
                employee_id INT PRIMARY KEY,
                employee_name VARCHAR(100) NOT NULL,
                department VARCHAR(50) NOT NULL,
                salary DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO employees (employee_id, employee_name, department, salary) VALUES
            (1, 'John', 'Sales', 50000),
            (2, 'Jane', 'Engineering', 75000),
            (3, 'Bob', 'Sales', 55000),
            (4, 'Alice', 'Engineering', 80000),
            (5, 'Charlie', 'HR', 60000);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["department", "avg_salary"],
                values: [
                    ["Engineering", 77500.00],
                    ["HR", 60000.00],
                    ["Sales", 52500.00],
                ],
            },
        ]
    },

    // MEDIUM CHALLENGES
    {
        slug: "challenge-6",
        title: "Challenge #6 – Top Scoring Students",
        difficulty: "Medium",
        description:
            "Report the students who scored 90 or above in the most recent algorithm exam. Provide their identifiers, names, and scores ranked from highest to lowest.",
        requirements: [
            "Return columns: student_id, student_name, score.",
            "Filter for scores greater than or equal to 90.",
            "Order results by score in descending order, breaking ties alphabetically by student_name.",
            "Assume exam_date represents the exam these scores belong to.",
        ],
        tables: [
            {
                name: "students",
                description: "Holds the latest exam submission per student.",
                columns: [
                    { name: "student_id", type: "INT", note: "Primary key" },
                    { name: "student_name", type: "VARCHAR", note: "Full name" },
                    { name: "score", type: "INT", note: "Exam score (0-100)" },
                    { name: "exam_date", type: "DATE", note: "Submission date" },
                ],
                values: [
                    { student_id: 101, student_name: "Amina Chen", score: 98, exam_date: "2024-09-14" },
                    { student_id: 102, student_name: "Leo Nunez", score: 87, exam_date: "2024-09-14" },
                    { student_id: 103, student_name: "Priya Patel", score: 95, exam_date: "2024-09-15" },
                    { student_id: 104, student_name: "Noah Smith", score: 91, exam_date: "2024-09-15" },
                    { student_id: 105, student_name: "Sara Lopez", score: 88, exam_date: "2024-09-16" },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE students (
                student_id INT PRIMARY KEY,
                student_name VARCHAR(100) NOT NULL,
                score INT NOT NULL,
                exam_date DATE NOT NULL
            );

            INSERT INTO students (student_id, student_name, score, exam_date) VALUES
            (101, 'Amina Chen', 98, '2024-09-14'),
            (102, 'Leo Nunez', 87, '2024-09-14'),
            (103, 'Priya Patel', 95, '2024-09-15'),
            (104, 'Noah Smith', 91, '2024-09-15'),
            (105, 'Sara Lopez', 88, '2024-09-16');

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["student_id", "student_name", "score"],
                values: [
                    [101, "Amina Chen", 98],
                    [103, "Priya Patel", 95],
                    [104, "Noah Smith", 91],
                ],
            },
        ]
    },
    {
        slug: "challenge-7",
        title: "Challenge #7 – Customer Orders Summary",
        difficulty: "Medium",
        description:
            "Find customers who have placed more than 2 orders and show their total spending.",
        requirements: [
            "Return columns: customer_id, customer_name, order_count, total_spent.",
            "Only include customers with more than 2 orders.",
            "Order by total_spent descending.",
            "Join customers and orders tables.",
        ],
        tables: [
            {
                name: "customers",
                description: "Customer information.",
                columns: [
                    { name: "customer_id", type: "INT", note: "Primary key" },
                    { name: "customer_name", type: "VARCHAR", note: "Customer name" },
                ],
                values: [
                    { customer_id: 1, customer_name: "Alice" },
                    { customer_id: 2, customer_name: "Bob" },
                    { customer_id: 3, customer_name: "Charlie" },
                    { customer_id: 4, customer_name: "Diana" },
                ],
            },
            {
                name: "orders",
                description: "Order transactions.",
                columns: [
                    { name: "order_id", type: "INT", note: "Primary key" },
                    { name: "customer_id", type: "INT", note: "Foreign key" },
                    { name: "order_amount", type: "DECIMAL", note: "Order total" },
                ],
                values: [
                    { order_id: 1, customer_id: 1, order_amount: 100.00 },
                    { order_id: 2, customer_id: 1, order_amount: 150.00 },
                    { order_id: 3, customer_id: 1, order_amount: 200.00 },
                    { order_id: 4, customer_id: 2, order_amount: 75.00 },
                    { order_id: 5, customer_id: 3, order_amount: 120.00 },
                    { order_id: 6, customer_id: 3, order_amount: 90.00 },
                    { order_id: 7, customer_id: 3, order_amount: 110.00 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE customers (
                customer_id INT PRIMARY KEY,
                customer_name VARCHAR(100) NOT NULL
            );

            CREATE TABLE orders (
                order_id INT PRIMARY KEY,
                customer_id INT NOT NULL,
                order_amount DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO customers (customer_id, customer_name) VALUES
            (1, 'Alice'),
            (2, 'Bob'),
            (3, 'Charlie'),
            (4, 'Diana');

            INSERT INTO orders (order_id, customer_id, order_amount) VALUES
            (1, 1, 100.00),
            (2, 1, 150.00),
            (3, 1, 200.00),
            (4, 2, 75.00),
            (5, 3, 120.00),
            (6, 3, 90.00),
            (7, 3, 110.00);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["customer_id", "customer_name", "order_count", "total_spent"],
                values: [
                    [1, "Alice", 3, 450.00],
                    [3, "Charlie", 3, 320.00],
                ],
            },
        ]
    },
    {
        slug: "challenge-8",
        title: "Challenge #8 – Product Categories Revenue",
        difficulty: "Medium",
        description:
            "Calculate total revenue for each product category and show only categories with revenue over $500.",
        requirements: [
            "Return columns: category, total_revenue.",
            "Join products and sales tables.",
            "Group by category and filter for total_revenue > 500.",
            "Order by total_revenue descending.",
        ],
        tables: [
            {
                name: "products",
                description: "Product catalog.",
                columns: [
                    { name: "product_id", type: "INT", note: "Primary key" },
                    { name: "product_name", type: "VARCHAR", note: "Product name" },
                    { name: "category", type: "VARCHAR", note: "Category" },
                ],
                values: [
                    { product_id: 1, product_name: "Laptop", category: "Electronics" },
                    { product_id: 2, product_name: "Phone", category: "Electronics" },
                    { product_id: 3, product_name: "Desk", category: "Furniture" },
                    { product_id: 4, product_name: "Chair", category: "Furniture" },
                    { product_id: 5, product_name: "Pen", category: "Stationery" },
                ],
            },
            {
                name: "sales",
                description: "Sales transactions.",
                columns: [
                    { name: "sale_id", type: "INT", note: "Primary key" },
                    { name: "product_id", type: "INT", note: "Foreign key" },
                    { name: "quantity", type: "INT", note: "Quantity sold" },
                    { name: "price", type: "DECIMAL", note: "Unit price" },
                ],
                values: [
                    { sale_id: 1, product_id: 1, quantity: 2, price: 999.99 },
                    { sale_id: 2, product_id: 2, quantity: 5, price: 699.99 },
                    { sale_id: 3, product_id: 3, quantity: 3, price: 299.00 },
                    { sale_id: 4, product_id: 4, quantity: 4, price: 150.00 },
                    { sale_id: 5, product_id: 5, quantity: 20, price: 2.50 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE products (
                product_id INT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL,
                category VARCHAR(50) NOT NULL
            );

            CREATE TABLE sales (
                sale_id INT PRIMARY KEY,
                product_id INT NOT NULL,
                quantity INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO products (product_id, product_name, category) VALUES
            (1, 'Laptop', 'Electronics'),
            (2, 'Phone', 'Electronics'),
            (3, 'Desk', 'Furniture'),
            (4, 'Chair', 'Furniture'),
            (5, 'Pen', 'Stationery');

            INSERT INTO sales (sale_id, product_id, quantity, price) VALUES
            (1, 1, 2, 999.99),
            (2, 2, 5, 699.99),
            (3, 3, 3, 299.00),
            (4, 4, 4, 150.00),
            (5, 5, 20, 2.50);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["category", "total_revenue"],
                values: [
                    ["Electronics", 5499.93],
                    ["Furniture", 1497.00],
                ],
            },
        ]
    },
    {
        slug: "challenge-9",
        title: "Challenge #9 – Employee Managers",
        difficulty: "Medium",
        description:
            "List all employees along with their manager's name. Show employees who have a manager.",
        requirements: [
            "Return columns: employee_name, manager_name.",
            "Use a self-join on the employees table.",
            "Exclude employees with no manager (CEO).",
            "Order by employee_name alphabetically.",
        ],
        tables: [
            {
                name: "employees",
                description: "Employee hierarchy.",
                columns: [
                    { name: "employee_id", type: "INT", note: "Primary key" },
                    { name: "employee_name", type: "VARCHAR", note: "Employee name" },
                    { name: "manager_id", type: "INT", note: "Manager's employee_id" },
                ],
                values: [
                    { employee_id: 1, employee_name: "Alice", manager_id: null },
                    { employee_id: 2, employee_name: "Bob", manager_id: 1 },
                    { employee_id: 3, employee_name: "Charlie", manager_id: 1 },
                    { employee_id: 4, employee_name: "David", manager_id: 2 },
                    { employee_id: 5, employee_name: "Eve", manager_id: 2 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE employees (
                employee_id INT PRIMARY KEY,
                employee_name VARCHAR(100) NOT NULL,
                manager_id INT
            );

            INSERT INTO employees (employee_id, employee_name, manager_id) VALUES
            (1, 'Alice', NULL),
            (2, 'Bob', 1),
            (3, 'Charlie', 1),
            (4, 'David', 2),
            (5, 'Eve', 2);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["employee_name", "manager_name"],
                values: [
                    ["Bob", "Alice"],
                    ["Charlie", "Alice"],
                    ["David", "Bob"],
                    ["Eve", "Bob"],
                ],
            },
        ]
    },
    {
        slug: "challenge-10",
        title: "Challenge #10 – Monthly Sales Trend",
        difficulty: "Medium",
        description:
            "Calculate total sales for each month in 2024 and show the month name and total.",
        requirements: [
            "Return columns: month_name, total_sales.",
            "Extract month from sale_date and format as month name.",
            "Sum all sales amounts per month.",
            "Order by month chronologically (January to December).",
        ],
        tables: [
            {
                name: "sales",
                description: "Daily sales transactions.",
                columns: [
                    { name: "sale_id", type: "INT", note: "Primary key" },
                    { name: "sale_date", type: "DATE", note: "Sale date" },
                    { name: "amount", type: "DECIMAL", note: "Sale amount" },
                ],
                values: [
                    { sale_id: 1, sale_date: "2024-01-15", amount: 200.00 },
                    { sale_id: 2, sale_date: "2024-01-20", amount: 300.00 },
                    { sale_id: 3, sale_date: "2024-02-10", amount: 450.00 },
                    { sale_id: 4, sale_date: "2024-03-05", amount: 350.00 },
                    { sale_id: 5, sale_date: "2024-03-25", amount: 400.00 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE sales (
                sale_id INT PRIMARY KEY,
                sale_date DATE NOT NULL,
                amount DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO sales (sale_id, sale_date, amount) VALUES
            (1, '2024-01-15', 200.00),
            (2, '2024-01-20', 300.00),
            (3, '2024-02-10', 450.00),
            (4, '2024-03-05', 350.00),
            (5, '2024-03-25', 400.00);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["month_name", "total_sales"],
                values: [
                    ["January", 500.00],
                    ["February", 450.00],
                    ["March", 750.00],
                ],
            },
        ]
    },

    // HARD CHALLENGES
    {
        slug: "challenge-11",
        title: "Challenge #11 – Consecutive Login Streak",
        difficulty: "Hard",
        description:
            "Find users who have logged in for at least 3 consecutive days and show their longest streak.",
        requirements: [
            "Return columns: user_id, username, longest_streak.",
            "Identify consecutive login dates.",
            "Calculate the longest consecutive streak for each user.",
            "Only show users with streaks of 3 or more days.",
            "Order by longest_streak descending.",
        ],
        tables: [
            {
                name: "users",
                description: "User accounts.",
                columns: [
                    { name: "user_id", type: "INT", note: "Primary key" },
                    { name: "username", type: "VARCHAR", note: "Username" },
                ],
                values: [
                    { user_id: 1, username: "alice123" },
                    { user_id: 2, username: "bob456" },
                    { user_id: 3, username: "charlie789" },
                ],
            },
            {
                name: "logins",
                description: "User login history.",
                columns: [
                    { name: "login_id", type: "INT", note: "Primary key" },
                    { name: "user_id", type: "INT", note: "Foreign key" },
                    { name: "login_date", type: "DATE", note: "Login date" },
                ],
                values: [
                    { login_id: 1, user_id: 1, login_date: "2024-01-01" },
                    { login_id: 2, user_id: 1, login_date: "2024-01-02" },
                    { login_id: 3, user_id: 1, login_date: "2024-01-03" },
                    { login_id: 4, user_id: 1, login_date: "2024-01-04" },
                    { login_id: 5, user_id: 2, login_date: "2024-01-01" },
                    { login_id: 6, user_id: 2, login_date: "2024-01-03" },
                    { login_id: 7, user_id: 3, login_date: "2024-01-01" },
                    { login_id: 8, user_id: 3, login_date: "2024-01-02" },
                    { login_id: 9, user_id: 3, login_date: "2024-01-03" },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE users (
                user_id INT PRIMARY KEY,
                username VARCHAR(100) NOT NULL
            );

            CREATE TABLE logins (
                login_id INT PRIMARY KEY,
                user_id INT NOT NULL,
                login_date DATE NOT NULL
            );

            INSERT INTO users (user_id, username) VALUES
            (1, 'alice123'),
            (2, 'bob456'),
            (3, 'charlie789');

            INSERT INTO logins (login_id, user_id, login_date) VALUES
            (1, 1, '2024-01-01'),
            (2, 1, '2024-01-02'),
            (3, 1, '2024-01-03'),
            (4, 1, '2024-01-04'),
            (5, 2, '2024-01-01'),
            (6, 2, '2024-01-03'),
            (7, 3, '2024-01-01'),
            (8, 3, '2024-01-02'),
            (9, 3, '2024-01-03');

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["user_id", "username", "longest_streak"],
                values: [
                    [1, "alice123", 4],
                    [3, "charlie789", 3],
                ],
            },
        ]
    },
    {
        slug: "challenge-12",
        title: "Challenge #12 – Second Highest Salary",
        difficulty: "Hard",
        description:
            "Find the second highest salary in each department. If a department has only one employee, return NULL.",
        requirements: [
            "Return columns: department, second_highest_salary.",
            "Use window functions or subqueries.",
            "Handle departments with fewer than 2 employees.",
            "Order by department alphabetically.",
        ],
        tables: [
            {
                name: "employees",
                description: "Employee salary data.",
                columns: [
                    { name: "employee_id", type: "INT", note: "Primary key" },
                    { name: "employee_name", type: "VARCHAR", note: "Employee name" },
                    { name: "department", type: "VARCHAR", note: "Department" },
                    { name: "salary", type: "DECIMAL", note: "Annual salary" },
                ],
                values: [
                    { employee_id: 1, employee_name: "Alice", department: "Engineering", salary: 95000 },
                    { employee_id: 2, employee_name: "Bob", department: "Engineering", salary: 85000 },
                    { employee_id: 3, employee_name: "Charlie", department: "Engineering", salary: 90000 },
                    { employee_id: 4, employee_name: "Diana", department: "Sales", salary: 70000 },
                    { employee_id: 5, employee_name: "Eve", department: "Sales", salary: 65000 },
                    { employee_id: 6, employee_name: "Frank", department: "HR", salary: 60000 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE employees (
                employee_id INT PRIMARY KEY,
                employee_name VARCHAR(100) NOT NULL,
                department VARCHAR(50) NOT NULL,
                salary DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO employees (employee_id, employee_name, department, salary) VALUES
            (1, 'Alice', 'Engineering', 95000),
            (2, 'Bob', 'Engineering', 85000),
            (3, 'Charlie', 'Engineering', 90000),
            (4, 'Diana', 'Sales', 70000),
            (5, 'Eve', 'Sales', 65000),
            (6, 'Frank', 'HR', 60000);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["department", "second_highest_salary"],
                values: [
                    ["Engineering", 90000],
                    ["HR", null],
                    ["Sales", 65000],
                ],
            },
        ]
    },
    {
        slug: "challenge-13",
        title: "Challenge #13 – Customer Retention Rate",
        difficulty: "Hard",
        description:
            "Calculate the month-over-month retention rate: the percentage of customers who made purchases in both the current and previous month.",
        requirements: [
            "Return columns: month, retention_rate.",
            "Compare each month with the previous month.",
            "Calculate percentage of returning customers.",
            "Round retention_rate to 2 decimal places.",
            "Order by month chronologically.",
        ],
        tables: [
            {
                name: "purchases",
                description: "Customer purchase history.",
                columns: [
                    { name: "purchase_id", type: "INT", note: "Primary key" },
                    { name: "customer_id", type: "INT", note: "Customer ID" },
                    { name: "purchase_date", type: "DATE", note: "Purchase date" },
                ],
                values: [
                    { purchase_id: 1, customer_id: 1, purchase_date: "2024-01-15" },
                    { purchase_id: 2, customer_id: 2, purchase_date: "2024-01-20" },
                    { purchase_id: 3, customer_id: 1, purchase_date: "2024-02-10" },
                    { purchase_id: 4, customer_id: 3, purchase_date: "2024-02-15" },
                    { purchase_id: 5, customer_id: 1, purchase_date: "2024-03-05" },
                    { purchase_id: 6, customer_id: 2, purchase_date: "2024-03-10" },
                    { purchase_id: 7, customer_id: 3, purchase_date: "2024-03-20" },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE purchases (
                purchase_id INT PRIMARY KEY,
                customer_id INT NOT NULL,
                purchase_date DATE NOT NULL
            );

            INSERT INTO purchases (purchase_id, customer_id, purchase_date) VALUES
            (1, 1, '2024-01-15'),
            (2, 2, '2024-01-20'),
            (3, 1, '2024-02-10'),
            (4, 3, '2024-02-15'),
            (5, 1, '2024-03-05'),
            (6, 2, '2024-03-10'),
            (7, 3, '2024-03-20');

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["month", "retention_rate"],
                values: [
                    ["2024-02", 50.00],
                    ["2024-03", 100.00],
                ],
            },
        ]
    },
    {
        slug: "challenge-14",
        title: "Challenge #14 – Product Recommendation Pairs",
        difficulty: "Hard",
        description:
            "Find pairs of products that are frequently bought together (in the same order). Show pairs that appear in at least 2 orders.",
        requirements: [
            "Return columns: product1_name, product2_name, times_bought_together.",
            "Self-join order_items to find product pairs in same orders.",
            "Avoid duplicate pairs (e.g., A-B and B-A should count as one).",
            "Filter for pairs appearing in 2 or more orders.",
            "Order by times_bought_together descending.",
        ],
        tables: [
            {
                name: "products",
                description: "Product catalog.",
                columns: [
                    { name: "product_id", type: "INT", note: "Primary key" },
                    { name: "product_name", type: "VARCHAR", note: "Product name" },
                ],
                values: [
                    { product_id: 1, product_name: "Laptop" },
                    { product_id: 2, product_name: "Mouse" },
                    { product_id: 3, product_name: "Keyboard" },
                    { product_id: 4, product_name: "Monitor" },
                ],
            },
            {
                name: "order_items",
                description: "Items in each order.",
                columns: [
                    { name: "order_id", type: "INT", note: "Order ID" },
                    { name: "product_id", type: "INT", note: "Product ID" },
                ],
                values: [
                    { order_id: 1, product_id: 1 },
                    { order_id: 1, product_id: 2 },
                    { order_id: 2, product_id: 1 },
                    { order_id: 2, product_id: 2 },
                    { order_id: 2, product_id: 3 },
                    { order_id: 3, product_id: 1 },
                    { order_id: 3, product_id: 3 },
                    { order_id: 4, product_id: 2 },
                    { order_id: 4, product_id: 4 },
                    { order_id: 5, product_id: 1 },
                    { order_id: 5, product_id: 2 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE products (
                product_id INT PRIMARY KEY,
                product_name VARCHAR(100) NOT NULL
            );

            CREATE TABLE order_items (
                order_id INT NOT NULL,
                product_id INT NOT NULL
            );

            INSERT INTO products (product_id, product_name) VALUES
            (1, 'Laptop'),
            (2, 'Mouse'),
            (3, 'Keyboard'),
            (4, 'Monitor');

            INSERT INTO order_items (order_id, product_id) VALUES
            (1, 1), (1, 2),
            (2, 1), (2, 2), (2, 3),
            (3, 1), (3, 3),
            (4, 2), (4, 4),
            (5, 1), (5, 2);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["product1_name", "product2_name", "times_bought_together"],
                values: [
                    ["Laptop", "Mouse", 3],
                    ["Laptop", "Keyboard", 2],
                ],
            },
        ]
    },
    {
        slug: "challenge-15",
        title: "Challenge #15 – Running Total with Reset",
        difficulty: "Hard",
        description:
            "Calculate a running total of daily sales for each product category, but reset the total when it exceeds $1000.",
        requirements: [
            "Return columns: sale_date, category, daily_amount, running_total.",
            "Calculate running total within each category ordered by date.",
            "Reset the running total to the current day's amount when it would exceed 1000.",
            "Order by category and sale_date.",
        ],
        tables: [
            {
                name: "daily_sales",
                description: "Daily sales by category.",
                columns: [
                    { name: "sale_id", type: "INT", note: "Primary key" },
                    { name: "sale_date", type: "DATE", note: "Sale date" },
                    { name: "category", type: "VARCHAR", note: "Product category" },
                    { name: "daily_amount", type: "DECIMAL", note: "Day's total" },
                ],
                values: [
                    { sale_id: 1, sale_date: "2024-01-01", category: "Electronics", daily_amount: 300 },
                    { sale_id: 2, sale_date: "2024-01-02", category: "Electronics", daily_amount: 400 },
                    { sale_id: 3, sale_date: "2024-01-03", category: "Electronics", daily_amount: 500 },
                    { sale_id: 4, sale_date: "2024-01-04", category: "Electronics", daily_amount: 200 },
                    { sale_id: 5, sale_date: "2024-01-01", category: "Furniture", daily_amount: 600 },
                    { sale_id: 6, sale_date: "2024-01-02", category: "Furniture", daily_amount: 300 },
                    { sale_id: 7, sale_date: "2024-01-03", category: "Furniture", daily_amount: 400 },
                ],
            },
        ],
        sqlTemplate: `
            CREATE TABLE daily_sales (
                sale_id INT PRIMARY KEY,
                sale_date DATE NOT NULL,
                category VARCHAR(50) NOT NULL,
                daily_amount DECIMAL(10, 2) NOT NULL
            );

            INSERT INTO daily_sales (sale_id, sale_date, category, daily_amount) VALUES
            (1, '2024-01-01', 'Electronics', 300),
            (2, '2024-01-02', 'Electronics', 400),
            (3, '2024-01-03', 'Electronics', 500),
            (4, '2024-01-04', 'Electronics', 200),
            (5, '2024-01-01', 'Furniture', 600),
            (6, '2024-01-02', 'Furniture', 300),
            (7, '2024-01-03', 'Furniture', 400);

            {SQL_QUERY_PLACEHOLDER}
        `,
        defaultQuery: `-- Write your SQL solution below\n`,
        expectedResult: [
            {
                columns: ["sale_date", "category", "daily_amount", "running_total"],
                values: [
                    ["2024-01-01", "Electronics", 300, 300],
                    ["2024-01-02", "Electronics", 400, 700],
                    ["2024-01-03", "Electronics", 500, 500],
                    ["2024-01-04", "Electronics", 200, 700],
                    ["2024-01-01", "Furniture", 600, 600],
                    ["2024-01-02", "Furniture", 300, 900],
                    ["2024-01-03", "Furniture", 400, 400],
                ],
            },
        ]
    },
];