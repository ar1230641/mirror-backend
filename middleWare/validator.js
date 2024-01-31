exports.mandatoryField = (object, fields) => {
    let fields_na = []; // fields_not_available
    fields.forEach(function (field) {
        if (!object.hasOwnProperty(field) || (object[field] == null || object[field] == '')) {
            fields_na.push(field);
        }
    });
    return fields_na;
}
