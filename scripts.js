

const API_URL = 'https://apis.is/isnic?domain=';


const program = (() => {
  let domains;

  function empty(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }

  function getFormattedDate(date) {
    return (new Date(date)).toJSON().substring(0, 10);
  }

  function displayError(error) {
    const container = domains.querySelector('.results');
    empty(container);
    container.appendChild(document.createTextNode(error));
  }

  function addRow(list, term, description) {
    if (term && description) {
      const dt = document.createElement('dt');
      dt.appendChild(document.createTextNode(term));
      const dd = document.createElement('dd');
      dd.appendChild(document.createTextNode(description));

      list.appendChild(dt);
      list.appendChild(dd);
    }
  }

  function displayDomain(result) {
    const container = domains.querySelector('.results');
    empty(container);

    if (result.length === 0) {
      displayError('Fann ekki lén');
      return;
    }

    const [{
      domain, registered, lastChange, expires, registrantname, email, address, country,
    }] = result;

    const dl = document.createElement('dl');
    addRow(dl, 'Lén', domain);
    addRow(dl, 'Skráð', getFormattedDate(registered));
    addRow(dl, 'Seinast breytt', getFormattedDate(lastChange));
    addRow(dl, 'Rennur út', getFormattedDate(expires));
    addRow(dl, 'Skráningaraðili', registrantname);
    addRow(dl, 'Netfang', email);
    addRow(dl, 'Heimilisfang', address);
    addRow(dl, 'Land', country);

    container.appendChild(dl);
  }

  function displayLoading() {
    const container = domains.querySelector('.results');
    empty(container);

    const div = document.createElement('div');
    div.setAttribute('class', 'loading');

    const img = document.createElement('img');
    img.src = 'loading.gif';
    div.appendChild(img);

    div.appendChild(document.createTextNode('Leita að léni...'));

    container.appendChild(div);
  }

  function fetchData(domain) {
    fetch(`${API_URL}${domain}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Villa kom upp!');
      })
      .then((value) => {
        displayDomain(value.results);
      })
      .catch(() => {
        displayError('Villa við að sækja gögn');
      });
  }

  function onSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');

    const domain = input.value.trim();

    if (domain.length > 0) {
      displayLoading();
      fetchData(domain);
    } else {
      displayError('Lén þarf að vera strengur');
    }
  }

  function init(_domains) {
    domains = _domains;

    const form = domains.querySelector('form');
    form.addEventListener('submit', onSubmit);
  }

  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  const domains = document.querySelector('.domains');
  program.init(domains);
});
