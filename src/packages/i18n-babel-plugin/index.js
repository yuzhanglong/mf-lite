export default function(instance) {
  return {
    visitor: {
      Program(path, state) {
        console.log(path);
      }
    },
  };
};
