const saveNationalityInDB = async ({ jsonInfo, Nationality }) => {
  let errors = [];
  for (const register of jsonInfo) {
    try {
      await Nationality.findOrCreate({
        where: {
          nameNationality: register?.nationality,
        },
      });
    } catch (error) {
      errors.push(error.message);
    }
  }
  if (errors.length >= 1) throw new Error(errors[0]);
};

module.exports = {
  saveNationalityInDB,
};
