// rbacConfig.js
const roles = {
  superAdmin: {
    can: [
      "create:agency",
      "read:agency",
      "update:agency",
      "delete:agency",
      "create:car",
      "read:car",
      "update:car",
      "delete:car",
      "create:reservation",
      "read:reservation",
      "update:reservation",
      "delete:reservation",
      "read:user",
      "update:user",
      "read:report",
    ],
  },
  agency: {
    can: [
      "create:car",
      "read:car",
      "update:car",
      "delete:car",
      "read:reservation",
      "update:reservation",
      "read:profile",
      "update:profile",
    ],
  },
  customer: {
    can: [
      "read:car",
      "create:reservation",
      "read:reservation",
      "update:profile",
    ],
  },
};

module.exports = roles;
