const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Users",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        email: {
            type: "varchar",
            unique: true,
            nullable: true
        },
        password: {
            type: "varchar"
        },

        role: {
            type: "varchar"
        }
    },
    relations: {
        employee: {
            type: "one-to-one",
            target: "Employee",
            inverseSide: "user"
        }
    }
});