// const API_URL = '/example.json?domain=';
const API_URL = 'https://apis.is/isnic?domain=';

/**
 * Leit að lénum á Íslandi gegnum apis.is
 */
const program = (() => {
  let results;

  function showData(data) {

    const {
      eventDataName,
      eventHallName,
      ekkiTil,
    } = data.results[0];

    const nafn = document.createElement ('p')


  }
  function init() {

  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  program.init(domains);
});

//fall sem hreinsar, fall sem eydir bornum. 