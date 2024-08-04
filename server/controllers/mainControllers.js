const AppDataSource = require('../config/dbConfig');

// GET /employees
const getAllEmployees = async (req, res) => {
    const employeeRepository = AppDataSource.getRepository('Employee');
    try {
        const employees = await employeeRepository.find();
        res.json({ employees });
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: 'Error fetching employees' });
    }
};

// GET /carmodels
const getAllCarModels = async (req, res) => {
    const carModelRepository = AppDataSource.getRepository('CarModel');
    try {
        const carmodels = await carModelRepository.find();
        res.json({ carmodels });
    } catch (error) {
        console.error('Error fetching car models:', error);
        res.status(500).json({ message: 'Error fetching car models' });
    }
};

// POST /carmodels
const createCarModel = async (req, res) => {
    const carModelRepository = AppDataSource.getRepository('CarModel');
    try {
        const newCarModel = await carModelRepository.save(req.body);
        res.status(201).json({ carmodel: newCarModel });
    } catch (error) {
        console.error('Error creating car model:', error);
        res.status(500).json({ message: 'Error creating car model' });
    }
};

// DELETE /carmodels/:id
const deleteCarModel = async (req, res) => {
    const carModelRepository = AppDataSource.getRepository('CarModel');
    try {
        const carModel = await carModelRepository.findOne({ where: { id: parseInt(req.params.id) } });
        if (!carModel) {
            return res.status(404).json({ message: 'Car model not found' });
        }
        await carModelRepository.remove(carModel);
        res.json({ carmodel: carModel });
    } catch (error) {
        console.error('Error deleting car model:', error);
        res.status(500).json({ message: 'Error deleting car model' });
    }
};

// GET /total_sales
const getTotalSales = async (req, res) => {
    const employeeRepository = AppDataSource.getRepository('Employee');
    try {
        const employees = await employeeRepository.find({
            relations: ['sales', 'sales.carModel']
        });

        const employeesWithSales = employees.map(employee => {
            const totalSales = employee.sales.reduce((sum, sale) => {
                return sum + (sale.carModel ? sale.carModel.price : 0);
            }, 0);

            return {
                id: employee.id,
                name: employee.name,
                sales: totalSales
            };
        });

        res.json({ employees: employeesWithSales });
    } catch (error) {
        console.error('Error fetching total sales:', error);
        res.status(500).json({ message: 'Error fetching total sales' });
    }
};

module.exports = { getAllEmployees, getAllCarModels, createCarModel, deleteCarModel, getTotalSales };