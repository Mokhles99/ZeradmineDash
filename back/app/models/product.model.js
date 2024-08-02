const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Veuillez entrer le nom du produit"]
  },
  description: {
    type: String,
    required: [true, "Veuillez entrer la description du produit"]
  },
  price:{
    type :String,
    required: [false,"Veuillez entrer le prix"]
  },
  famille: {
    type: String,
    required: [true, "Veuillez spécifier la famille"],
    enum: [
      'Outils manuel',
      'Outils electrique',
      'Outils de jardin',
      'Quincaillerie de fixation',
      'Quincaillerie de menuiserie',
      'Plomberie',
      'Peinture',
      'Équipement de securite',
      'Outils de construction'
    ]
  },
  type: {
    type: String,
    required: [true, "Veuillez spécifier le type"],
    enum: [
      'Tournevis', 'Marteaux', 'Pinces', 'Clés', 'Scies', 'Mesures',
      'Interrupteurs', 'Prises de courant', 'Câbles électriques', 'Lampes et luminaires','Disjoncteur', 'Boîtes de jonction',
      'Tondeuses à gazon', 'Taille-haies', 'Brouettes', 'Arrosoirs',
      'Vis', 'Clous', 'Boulons', 'Écrous', 'Crochets', 'Chevilles', 'Rivet','Goujons dancrage',
      'Poignées', 'Serrures', 'Charnières', 'Verrous',
      'Robinets', 'Raccords","Collecteurs', 'Tuyaux', 'Éviers', 'Toilettes', 'Douches', 'Siphons',
      'Peinture et décoration', 'Pinceaux et Rouleaux', 'Rubans de masquage', 'Bâches de protection', 'Diluants et solvants', 'Mastics et enduits',
      'Casques', 'Lunettes', 'Gants', 'Vêtements',
      'Plâtre', 'Ciment', 'Étanchéité'
    ]
  },
  files: [{
    public_id: String,
    url: String
  }]
});

module.exports = mongoose.model('Product', productSchema);
