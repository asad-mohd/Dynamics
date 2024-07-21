function generateRandomString(length: number): string {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function generatePrimaryIdNumber(length: number) {
  let primaryIDNumber = "";
  for (let i = 0; i < length; i++) {
    primaryIDNumber += Math.floor(Math.random() * 10).toString();
  }
  return primaryIDNumber;
}

export default { generateRandomString, generatePrimaryIdNumber };
