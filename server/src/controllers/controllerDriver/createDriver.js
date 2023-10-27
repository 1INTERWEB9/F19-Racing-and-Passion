const createDriver = async ({ Driver, register }) => {
  let codeDriver = null;
  let numberDriver = null;
  let descriptionDriver = null;
  if (register?.code != "\\N") codeDriver = register?.code;
  if (Number.isInteger(register?.number)) numberDriver = register?.number;
  if (register?.description?.length > 10 && register?.description)
    descriptionDriver = register?.description;
  await Driver.findOrCreate({
    where: {
      driverRef: register?.driverRef,
      forename: register?.name?.forename,
      surname: register?.name?.surname,
      number: numberDriver,
      code: codeDriver,
      dob: register?.dob,
      nationality: register?.nationality,
      url: register?.url,
      description: descriptionDriver,
    },
  });
};

module.exports = {
  createDriver,
};
