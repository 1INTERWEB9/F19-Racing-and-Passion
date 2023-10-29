const { Op } = require("sequelize");

const formatFiltersAPI = ({ drivers, filters, id }) => {
  const driversFiltered = drivers.filter((driverFilter) => {
    let validation = 0;
    if (id) {
      if (driverFilter.id == id) return driverFilter;
    } else {
      for (const key in filters) {
        if (Array.isArray(driverFilter[key])) {
          for (let index = 0; index < driverFilter[key].length; index++) {
            let auxDriverFilter = driverFilter[key];
            driverFilter[key] = driverFilter[key][index];
            validation =
              validation + objectFilterAPI({ driverFilter, key, filters });
            driverFilter[key] = auxDriverFilter;
          }
        } else {
          validation =
            validation + objectFilterAPI({ driverFilter, key, filters });
        }
      }
      if (validation === Object.keys(filters).length) return driverFilter;
    }
  });
  return driversFiltered;
};

const objectFilterAPI = ({ driverFilter, key, filters }) => {
  let validation = 0;
  let flag = false;
  if (typeof driverFilter[key] === "object" && driverFilter[key] != null) {
    Object.entries(driverFilter[key]).filter(([subkey, value]) => {
      if (typeof value == "string") {
        if (value.toLowerCase().includes(filters[key].toLowerCase())) {
          if (!flag) {
            flag = true;
            validation++;
          }
        }
      }
    });
  } else if (driverFilter[key] != null) {
    if (driverFilter[key] == filters[key]) {
      validation++;
    }
  }
  return validation;
};

const formatFiltersDB = ({ filters }) => {
  let driverFilter = {
    name: "%%",
  };
  let imageFilter = "%%";
  let teamsFilter = "%%";
  for (const key in filters) {
    if (
      key.toLowerCase() != "image" &&
      key.toLowerCase() != "teams" &&
      key.toLowerCase() != "name"
    ) {
      driverFilter[key.toLowerCase()] = filters[key.toLowerCase()];
    } else if (key.toLowerCase() == "name") {
      if (filters[key].length >= 1)
        driverFilter[key.toLowerCase()] =
          "%" + filters[key.toLowerCase()] + "%";
    } else if (key.toLowerCase() == "image") {
      if (filters[key].length >= 1)
        imageFilter = "%" + filters[key.toLowerCase()] + "%";
    } else {
      if (filters[key].length >= 1)
        teamsFilter = "%" + filters[key.toLowerCase()] + "%";
    }
  }
  return [driverFilter, imageFilter, teamsFilter];
};

module.exports = {
  formatFiltersAPI,
  formatFiltersDB,
};
