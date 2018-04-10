var mongoose = require('mongoose');

var GiftSchema = new mongoose.Schema({
    naam: String,
    beschrijving: String,
    prijs: Number,
    categorieen: [String],
    aanmaakdatum: Date,
    likes: Number,
});

mongoose.model('Gift', GiftSchema);