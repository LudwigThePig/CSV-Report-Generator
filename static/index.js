const URI = 'http://localhost:3000';

////__________________________________________________________________
//FETCH DATA FROM API
const fetchCSV = (text, contentType) => {
  const options = {
    method: 'POST',
    body: text
  }

  return fetch(`${URI}/csv`, options)
    .then(res => res.json())
    .then(data => updateOutput(data.csv))
    .catch(err => console.log(err));
}

const fetchDownload = () => {
  return fetch(`${URI}/download`)
    .then(res => res)
    .then(file => window.location = '/download')
    .catch(err => console.log(err));
}


//__________________________________________________________________
//UPDATE VIEW
const updateOutput = (csv) => {
  const output = document.getElementById('output');
  output.innerHTML = '';
  let rows = csv.split('\n');
  rows.forEach(row => {
    let div = document.createElement('div');
    div.classList.add('csv-row');
    row.split(',').forEach(col => {
      let el = document.createElement('p');
      el.innerHTML = col;
      div.appendChild(el);
    })
    output.appendChild(div);
  })
  document.getElementById('download').style.display = 'inline'
}


//__________________________________________________________________
//EVENT LISTENERS

const formEl = document.getElementById('json-input');
formEl.addEventListener('submit', e => {
  e.preventDefault();
  let input = new FormData(formEl);
  fetchCSV(input, 'multipart/form-data');
});

document.getElementById('download').addEventListener('click', e => {
  fetchDownload();
});
