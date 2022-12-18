function create(req, res) {
  var model = req.body;
  var id = model.id;
  var data = model.data;
  var collection = model.collection;

  if (id) {
     db.collection(collection).update({
         _id: new ObjectId(id)
     }), data, function (err, result) {
     }
   } else {
       db.collection(collection).insert(data, function (err, result) {
       })
    }
}

function read(req, res) {
  var model = req.body;
  var id = model.id;
  var collection = model.collection;

  if (id) {
    db.collection(collection).findOne({
      _id: new ObjectId(id)
    }, function (err, result) {
    });
  } else {
    db.collection(collection).find().toArray(function (err, result) {
    });
  }
}

function update(req, res) {
   var model = req.body;
   var id = model.id;
   var data = model.data;
   var collection = model.collection;
   
   db.collection(collection).update({
      _id: new ObjectId(id)
   }, data
      , function (err, result) {
      }
   );
}

function elete(req, res) {
   var model = req.body;
   var id = model.id;
   var collection = model.collection;
   
   db.collection(collection).remove({
      _id: new ObjectId(id)
   }, function (err, result) {
   });
}

