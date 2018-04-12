let mongoose = require('mongoose');

let CategorieSchema = new mongoose.Schema({
    naam: String,
    soort: String,
});

CategorieSchema.pre('remove', function (next) {
    this.model('Gift').update({},
        { $pull: { categorieen: this._id } },
        { safe: true, multi: true }, next);
});

mongoose.model('Categorie', CategorieSchema);