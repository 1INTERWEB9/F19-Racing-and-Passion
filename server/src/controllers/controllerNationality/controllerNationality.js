const createNationality = async ({ register, Nationality }) => {
  await Nationality.findOrCreate({
    where: {
      nameNationality: register?.nationality,
    },
  });
};

module.exports = {
  createNationality,
};
