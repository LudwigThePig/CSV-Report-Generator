const URI = 'http://localhost:3000'

////__________________________________________________________________
//FETCH DATA FROM API
const fetchCSV = (text) => {
  const body = {json: text}
  const options = {
    method: 'POST',
    body: JSON.stringify(exampleJSON),
    headers: {
      'Content-Type': 'application/json'
    }
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
  document.getElementById('output').innerHTML = csv;
  document.getElementById('download').style.display = 'inline'
}


//__________________________________________________________________
//EVENT LISTENERS
document.getElementById('json-input').addEventListener('submit', e => {
  e.preventDefault();
  const textarea = e.path[0][0].value;
  fetchCSV(textarea);
});

document.getElementById('download').addEventListener('click', e => {
  fetchDownload();
});