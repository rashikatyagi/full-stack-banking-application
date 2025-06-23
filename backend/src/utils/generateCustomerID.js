export const generateCustomerId = () => {
  const random = Math.floor(100000 + Math.random() * 900000); // 6-digit
  return `CUST${random}`;
};
