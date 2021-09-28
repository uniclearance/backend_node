module.exports = (length = 6) => {
  const CHARACTERS = "0123456789";
   let otp = "";
  for (let index = 0; index < length; index++) {
    otp += CHARACTERS[Math.floor(Math.random() * 10)];
  }
  return otp;
};


