//Utilizamos module.export para exportar objetos para que puedan ser utilizados en otras clases
module.exports = (sequelize, Sequelize) => {
// usamos el sequelize.defina para "definir" el nombre de la entity en la BD, en este caso "cliente"
// Usamos type.Sequelize para definir el tipo de datos de cada atributo de la entidad 
    const Cliente = sequelize.define("cliente", {
        carnet: {
            type: Sequelize.STRING
        },
        estudiante: {
            type: Sequelize.STRING
        },
        mes: {
            type: Sequelize.STRING
        },
        semestre: {
            type: Sequelize.STRING
        },
        año: {
            type: Sequelize.STRING
        },
        monto:{
            type: Sequelize.FLOAT
        },
        transaccionStripe:{
            type: Sequelize.STRING
        },
        statusStripe: {
            type: Sequelize.BOOLEAN
        }
    });
    return Cliente;
};