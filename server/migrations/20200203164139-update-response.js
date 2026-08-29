"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addConstraint("HelpResponses", {
        fields: ["id_responder"],
                type: "foreign key",
                name: "custom_fkey_helpresponse_responder",
                references: { table: "Users", field: "id" },
                onDelete: "cascade",
                onUpdate: "cascade"
            }),
            queryInterface.addConstraint("HelpResponses", {
        fields: ["id_help"],
                type: "foreign key",
                name: "custom_fkey_helpresponse_help",
                references: { table: "Help", field: "id" },
                onDelete: "cascade",
                onUpdate: "cascade"
            })
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeConstraint("HelpResponses", "custom_fkey_helpresponse_responder"),
            queryInterface.removeConstraint("HelpResponses", "custom_fkey_helpresponse_help")
        ]);
    }
};