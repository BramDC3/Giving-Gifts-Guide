let mongoose = require('mongoose');

let GiftSchema = new mongoose.Schema({
    naam: String,
    beschrijving: String,
    prijs: {type:Number},
    eigenaar: String,
    categorieen: [{type: mongoose.Schema.Types.ObjectId, ref: 'Categorie'}],
    aanmaakdatum: { type:Date, default: Date.now },
    likes: {type:Number, default:0},
});

mongoose.model('Gift', GiftSchema);