require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AppDataSource = require('../config/dbConfig');
const User = require('../model/user');
const Employee = require('../model/employee');  // Add this line

const test = (req, res) => {
    res.json('test is working');
};

const registerUser = async (req, res) => {
    try {
        const { email, password, id, name } = req.body;
        
        // Check if user already exists
        const existingUser = await AppDataSource.getRepository(User).findOne({ where: { email } });
        if (existingUser) {
            return res.json({
                error: 'Email is taken already'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        let role = 'user';
        let employee = null;

        // Create user
        const user = AppDataSource.getRepository(User).create({
            email,
            password: hashedPassword,
            role
        });

        const savedUser = await AppDataSource.getRepository(User).save(user);

        if (id && id.trim() !== '') {
            // Check if employee already exists
            employee = await AppDataSource.getRepository(Employee).findOne({ where: { id } });
            
            if (employee) {
                // Update existing employee
                employee.user = savedUser;
                employee.name = name; // Assuming you want to update the name as well
                await AppDataSource.getRepository(Employee).save(employee);
                savedUser.role = 'employee';
                await AppDataSource.getRepository(User).save(savedUser);
            } else {
                // Create new employee
                const newEmployee = AppDataSource.getRepository(Employee).create({
                    id,
                    name,
                    user: savedUser
                });
                await AppDataSource.getRepository(Employee).save(newEmployee);
                savedUser.role = 'employee';
                await AppDataSource.getRepository(User).save(savedUser);
            }
        }

        return res.json({
            message: 'User registered successfully',
            user: {
                id: savedUser.id,
                email: savedUser.email,
                role: savedUser.role,
                employeeId: employee ? employee.id : null
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ error: 'Registration failed', details: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required'
            });
        }

        // Check if user exists
        const user = await AppDataSource.getRepository(User).findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                error: 'Invalid credentials'
            });
        }

        // Check if user is an employee and fetch employee details if so
        let employeeDetails = null;
        if (user.role === 'employee') {
            employeeDetails = await AppDataSource.getRepository(Employee).findOne({ where: { user: user } });
            if (!employeeDetails) {
                return res.status(500).json({
                    error: 'Employee details not found'
                });
            }
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                id: user.id, 
                email: user.email, 
                role: user.role,
                employeeId: employeeDetails ? employeeDetails.id : null
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({
            message: 'Login successful',
            user: { 
                id: user.id, 
                email: user.email, 
                role: user.role,
                employeeId: employeeDetails ? employeeDetails.id : null
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            error: 'An error occurred during login',
            details: error.message
        });
    }
};

const getProfile = async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await AppDataSource.getRepository(User).findOne({ where: { id: decoded.id } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Exclude password from the response
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        console.log(error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
};

const logout = (req, res) => {
    // With token-based auth, we don't need to do anything server-side for logout
    // The client should remove the token on their end
    res.json({ message: 'Logged out successfully' });
};

const getEmployeeDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const employee = await AppDataSource.getRepository(Employee).findOne({
        where: { id },
        relations: ['user']
      });
  
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      res.json({
        id: employee.id,
        name: employee.name,
        email: employee.user.email,
        // Add any other relevant employee details here
      });
    } catch (error) {
      console.error('Error fetching employee details:', error);
      res.status(500).json({ error: 'An error occurred while fetching employee details' });
    }
  };

// Export all functions at the end
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logout,
    getEmployeeDetails
};