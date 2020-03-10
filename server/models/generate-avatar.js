const generateAvatar = () => {

  return {
    body: Math.floor(Math.random() * 4),
    eyes: Math.floor(Math.random() * 4),
    mouth: Math.floor(Math.random() * 4),
    ears: Math.floor(Math.random() * 4),
    nose: Math.floor(Math.random() * 4),
    color: Math.floor(Math.random() * 4)
  };
};

module.exports = generateAvatar;

