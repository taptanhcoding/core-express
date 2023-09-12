const bcrypt = require("bcrypt");


module.exports = {
  handleCompare: async (password, dbPassword) => {
    let same = await bcrypt.compare(password, dbPassword);
    return same;
  },
};
