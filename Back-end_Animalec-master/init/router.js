module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    app.use('/animals', require('../routes/animal.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/questions', require('../routes/question.routes'));
    app.use('/quizzes', require('../routes/quiz.routes'));
    app.use('/users/levels', require('../routes/userlevel.routes'));
    app.use('/users', require('../routes/user.routes'));
    app.use('/emails', require('../routes/email.routes'));
    
    // Novas rotas para novas emtidades
    app.use('/especialistas', require('../routes/especialista.routes'));
    app.use('/patrocinadores', require('../routes/patrocinador.routes'));
    app.use('/niveisPatrocinio', require('../routes/niveisPatrocinio.routes'));
}
