const delay = async (time: number) => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, time);
  });
};

export default delay;
