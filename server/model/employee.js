const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Employee",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        }
    },
    relations: {
        user: {
            type: "one-to-one",
            target: "Users",
            joinColumn: true,
            inverseSide: "employee"
        },
        sales: {
            type: "one-to-many",
            target: "Sale",
            inverseSide: "employee"
        }
    }
});