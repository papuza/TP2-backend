const rutas = (app) => {

  const Marker = require('../models/markers')

  //GET(GET)
  const findAllMarkers = (req, res) => {
    Marker.find((err, markers) => {
      if (!err) {
        console.log('GET /markers')
        res.send(markers)
      }
    })
  }

  //ADD (POST)
  const addMarker = (req, res) => {
    console.log(req.body)
    const marker = new Marker({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      lat: req.body.lat,
      lng: req.body.lng,
      type: req.body.categoria
    })

    marker.save((err) => {
      if (!err) {
        console.log("Creado!")
      } else {
        console.log("Hubo un error", err)
      }
    })
    res.send(marker);
  }

  //EDIT (PUT)

  const editMarker = (req, res) => {
    console.log("datos: ", req.body)
    Marker.findById(req.params.id, (err, marker) => {
      marker.nombre = req.body.nombre;
      marker.descripcion = req.body.descripcion;
      marker.lat = req.body.lat;
      marker.lng = req.body.lng;
      marker.type = req.body.categoria;
      marker.save((err) => {
        if (!err) {
          console.log("Actualizado");
        } else {
          console.log("Error", err);
        }
        res.send(marker);
      })
    })
  }

  //REMOVE (DELETE)

  const deleteMarker = (req, res) => {
    Marker.findById(req.params.id, (err, marker) => {
      marker.remove((err) => {
        if (!err) {
          console.log("Eliminado");
        } else {
          console.log("Error", err);
        }
        res.send(marker);
      })
    })
  }

  //FIND ONE (GET)
  const findOneMarker = (req, res) => {
    Marker.findById(req.params.id, (err, marker) => {
      if (!err) {
        console.log('GET /markers')
        res.send(marker)
      }
    })
  }

  app.get('/markers', findAllMarkers);
  app.get('/markers/:id', findOneMarker);
  app.post('/markers', addMarker);
  app.put('/markers/:id', editMarker);
  app.delete('/markers/:id', deleteMarker);

}

module.exports = rutas