const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Sale",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        date: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        employee: {
            type: "many-to-one",
            target: "Employee",
            inverseSide: "sales"
        },
        carModel: {
            type: "many-to-one",
            target: "CarModel",
            inverseSide: "sales"
        }
    }
});