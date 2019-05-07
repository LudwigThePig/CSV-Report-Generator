const URI = 'http://localhost:3000'

const fetchCSV = (text) => {
  const body = {json: text}
  const options = {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return fetch(`${URI}/csv`, options)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}








document.getElementById('json-input').addEventListener('submit', (e)=>{
  e.preventDefault();
  const textarea = e.path[0][0].value;
  fetchCSV(textarea);
})