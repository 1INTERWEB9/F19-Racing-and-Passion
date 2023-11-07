const arraySort = require("array-sort");

const sortDriver = (sort, results, reverse) => {
  switch (sort) {
    case "forename":
      sortObject(results, sort, reverse);
      break;
    case "surname":
      sortObject(results, sort, reverse);
      break;
    case "teams":
      sortObject(results, sort, reverse);
      break;
    case "nationality":
      sortObject(results, sort, reverse);
      break;
    case "image":
      sortObject(results, sort, reverse);
      break;
    default:
      arraySort(results, sort, { reverse: reverse == "true" ? true : false });
      break;
  }
  if (!sort && reverse == "true") results.reverse();
};

const sortObject = (results, sort, reverse) => {
  arraySort(results, function (a, b) {
    let valueA;
    let valueB;
    if (sort == "teams") {
      if ((a.teams || a.Teams) && (b.teams || b.Teams)) {
        if (a.teams) valueA = a?.teams[0]?.nameTeam;
        else if (a.Teams) valueA = a?.Teams[0]?.dataValues?.nameTeam;
        if (b.teams) valueB = b?.teams[0]?.nameTeam;
        else if (b.Teams) valueB = b?.Teams[0]?.dataValues?.nameTeam;
      }
    } else if (sort == "nationality") {
      if (
        (a.nationality || a.Nationality) &&
        (b.nationality || b.Nationality)
      ) {
        if (a.nationality) valueA = a?.nationality?.nameNationality;
        else if (a.Nationality)
          valueA = a.Nationality.dataValues.nameNationality;
        if (b.nationality) valueB = b?.nationality?.nameNationality;
        else if (b.Nationality)
          valueB = b?.Nationality?.dataValues?.nameNationality;
      }
    } else if (sort == "image") {
      if ((a.image || a.Image) && (b.image || b.Image)) {
        if (a.image) valueA = a?.image?.imageBy;
        else if (a.Image) valueA = a.Image.dataValues.imageBy;
        if (b.image) valueB = b?.image?.imageBy;
        else if (b.Image) valueB = b?.Image?.dataValues?.imageBy;
      }
    } else if (sort == "forename") {
      if ((a.name || a.forename) && (b.name || b.forename)) {
        if (a.name) valueA = a?.name?.forename;
        else if (a.forename) valueA = a?.forename;
        if (b.name) valueB = b?.name?.forename;
        else if (b.forename) valueB = b?.forename;
      }
    } else if (sort == "surname") {
      if ((a.name || a.surname) && (b.name || b.surname)) {
        if (a.name) valueA = a?.name?.surname;
        else if (a.surname) valueA = a?.surname;
        if (b.name) valueB = b?.name?.surname;
        else if (b.surname) valueB = b?.surname;
      }
    }

    if (reverse == "true") {
      if (valueA > valueB) return -1;
      if (valueA < valueB) return 1;
    } else {
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
    }
    return 0;
  });
};
module.exports = { sortDriver };
