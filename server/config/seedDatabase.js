const fs = require('fs');
const path = require('path');


async function seedDatabase(AppDataSource) {
    const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf8'));
    const { carshop } = jsonData;

    // Repositories
    const employeeRepo = AppDataSource.getRepository('Employee');
    const carModelRepo = AppDataSource.getRepository('CarModel');
    const saleRepo = AppDataSource.getRepository('Sale');

    // Seed Employees
    for (const emp of carshop.employees) {
        await employeeRepo.save(emp);
    }

    // Seed Car Models
    for (const car of carshop.carmodels) {
        await carModelRepo.save(car);
    }

    // Seed Sales
    for (const sale of carshop.sales) {
        const employee = await employeeRepo.findOne({ where: { id: sale.employee_id } });
        const carModel = await carModelRepo.findOne({ where: { id: sale.carmodel_id } });
        await saleRepo.save({
            employee,
            carModel,
            date: new Date()
        });
    }

    console.log('Database seeded successfully');
}

module.exports = seedDatabase;