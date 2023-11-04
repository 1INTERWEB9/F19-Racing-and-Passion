const createDriver = async ({ Driver, register, Nationality }) => {
  let codeDriver = null;
  let numberDriver = null;
  let descriptionDriver = null;
  if (register?.code != "\\N") codeDriver = register?.code;
  if (Number.isInteger(register?.number)) numberDriver = register?.number;
  if (register?.description?.length > 10 && register?.description)
    descriptionDriver = register?.description;
  let nationalityFilter = await Nationality.findOne({
    where: { nameNationality: register?.nationality },
  });
  let [driver] = await Driver.findOrCreate({
    where: {
      driverRef: register?.driverRef,
      forename: register?.name?.forename
        ? register?.name?.forename
        : register?.forename,
      surname: register?.name?.surname
        ? register?.name?.surname
        : register?.surname,
      number: numberDriver,
      code: codeDriver,
      dob: register?.dob,
      nationality: nationalityFilter?.id_Nationality,
      url: register?.url,
      description: descriptionDriver,
    },
  });
  driver.setNationality(nationalityFilter?.id_Nationality);
  return driver;
};

module.exports = {
  createDriver,
};
