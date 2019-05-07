const URI = 'http://localhost:3000'

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
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


const exampleJSON = {
  "firstName": "Joshie",
  "lastName": "Wyattson",
  "county": "San Mateo",
  "city": "San Mateo",
  "role": "Broker",
  "sales": 1000000,
  "children": [
  {
    "firstName": "Beth Jr.",
    "lastName": "Johnson",
    "county": "San Mateo",
    "city": "Pacifica",
    "role": "Manager",
    "sales": 2900000,
    "children": [
      {
        "firstName": "Smitty",
        "lastName": "Won",
        "county": "San Mateo",
        "city": "Redwood City",
        "role": "Sales Person",
        "sales": 4800000,
        "children": []
      },
      {
        "firstName": "Allen",
        "lastName": "Price",
        "county": "San Mateo",
        "city": "Burlingame",
        "role": "Sales Person",
        "sales": 2500000,
        "children": []
      }
    ]
  },
  {
    "firstName": "Beth",
    "lastName": "Johnson",
    "county": "San Francisco",
    "city": "San Francisco",
    "role": "Broker/Sales Person",
    "sales": 7500000,
    "children": []
  }
]
};





document.getElementById('json-input').addEventListener('submit', (e)=>{
  e.preventDefault();
  const textarea = e.path[0][0].value;
  fetchCSV(textarea);
})