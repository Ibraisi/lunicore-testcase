const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "CarModel",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        brand: {
            type: "varchar"
        },
        model: {
            type: "varchar"
        },
        price: {
            type: "int"
        }
    },
    relations: {
        sales: {
            type: "one-to-many",
            target: "Sale",
            inverseSide: "carModel"
        }
    }
});