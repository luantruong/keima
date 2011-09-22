const model = require('./model');

exports.index = function(req, res){
    model.App.all(function(xs){
        res.render('app/index',
                   { title : 'Dashboard',
                     apps  : xs });
    });
};

exports.new = function(req, res){
    res.render('app/new',{title: 'Create new application'});
};

exports.create = function(req, res){
    model.App.create(req.body.title,
                     function(error){
                         if(error){
                             res.send('app create error:' + error);
                         }else{
                             res.redirect('/app/');
                         }
                     });
};

exports.show = function(req, res){
    model.App.get(req.params.app,
                  function(app) {
                      res.render("app/show",
                                 { title : app.title,
                                   app   : app })
                  });
};


exports.edit = function(req, res){
    model.App.get(req.params.app,
                  function(app) {
                      res.render("app/edit",
                                 { title : 'Edit: ' + app.title,
                                   app   : app })
                  });
};

exports.update = function(req, res){
    model.App.update(req.params.app,
                     { title : req.body.title },
                     function(){
                         res.redirect("/app/" + req.params.app)
                     });
};

exports.destroy = function(req, res){
    model.App.remove(req.params.app,
                     function() {
                         res.redirect("/app/")
                     });
};

exports.extras = function(server,name) {
    server.get('/' + name + '/:app/getting_start',function(req, res) {
        const address = server.address();
        console.log(address);
        model.App.get(req.params.app, function(app) {
            res.render("app/getting_start",
                       { title : "Getting start",
                         address  : address.address + ":" + address.port,
                         app   : app })
        });
    })
}