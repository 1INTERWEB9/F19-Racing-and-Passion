const saveDriverInDB = async ({ jsonInfo, Driver }) => {
  let errors = [];
  for (const register of jsonInfo.drivers) {
    try {
      await Driver.create({
        referenceDriver: register?.driverRef,
        foreNameDriver: register?.name?.forename,
        surNameDriver: register?.name?.surname,
        numberDriver: register?.number,
        codeDriver: register?.code,
        dateOfBornDriver: register?.dob,
        nationalityDriver: register?.nationality,
        urlDriver: register?.url,
        descriptionDriver: register?.description,
      });
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveDriverInDB,
};
