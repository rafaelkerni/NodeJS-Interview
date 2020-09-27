module.exports = app => {

    app.route("/cidades/:id?")
    .get(app.controllers.cidadesController.get)
    .post(app.controllers.cidadesController.post)
    .delete(app.controllers.cidadesController.del)
    .put(app.controllers.cidadesController.update);

    app.route("/clientes/:id?")
    .get(app.controllers.clientesController.get)
    .post(app.controllers.clientesController.post)
    .delete(app.controllers.clientesController.del)
    .put(app.controllers.clientesController.update);

    //rota não encontrada
    app.use((req, res) => res.status(404).send({
      erro: `${req.method} ${req.path} não encontrado`,
    }));
};