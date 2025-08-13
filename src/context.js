export const createContext = ({ req }) => {
  return {
    user: req.user || null,
    // Add DB or auth logic here
  };
};
