export const jwtConfig = {
  secret: process.env.JWT_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
};
