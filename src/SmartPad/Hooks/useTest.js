const useTest = () => {
  return {
    yes: "yes",
    no: "no",
    maybe: Math.random() > 0.5 ? "yes" : "no",
  };
};

export default useTest;
