import heros from '../src/superheros-prod';
import powers from '../src/superheros-powers';
import marvel from '../src/marvel';

const getMarvelData = (hero) => {
  const theHeros = marvel.filter((item) => item.name.toLowerCase() == hero.toLowerCase());
  if (theHeros.length >= 1) { return theHeros[0]; }
  return false;
};

const createData = (power, value) => ({ power, value });

const getPowersData = (hero) => {
  const powerLabels = Object.keys(powers);
  const powerData = [];
  let heroIndex;
  for (let i = 0; i < powers.Name.length; i++) {
    if (powers.Name[i] == hero) {
      heroIndex = i;
      break;
    }
  }
  powerLabels.forEach((item, index) => {
    powerData.push(createData(item, powers[item][heroIndex]));
  });
  return powerData;
};

const createHeroData = (value) => {
  let newData;
  if (value) {
    const result = heros.filter((item) => item.name == value.name);
    const powers = getPowersData(value.name);
    const publisher = result[0]?.biography?.publisher;
    if (publisher == 'Marvel Comics') {
      const marvelData = getMarvelData(value.name);
      newData = { data: result[0], marvelImage: marvelData?.path, description: marvelData?.description, powers };
    } else {
      newData = { data: result[0], marvelImage: false, description: false, powers };
    }
  } else {
    newData = false;
  }
  return newData;
};

export default createHeroData;
