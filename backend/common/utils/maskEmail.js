const getMaskedEmail = (email) => {
  const [localPart, domain] = email.split("@");

  if (localPart.length <= 2) {
    return email; // If the local part is too short, return as is
  }

  return (
    localPart[0] +
    "*".repeat(localPart.length - 2) +
    localPart.slice(-1) +
    "@" +
    domain
  );
};

module.exports = getMaskedEmail;
