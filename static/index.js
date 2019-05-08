const URI = 'http://localhost:3000';
let fileInput = true;
let textInput = false;


////__________________________________________________________________
//FETCH DATA FROM API
const fetchCSV = (text, contentType) => {
  const body = {json: text}
  const options = {
    method: 'POST',
    body: text,
    // headers: {
    //   'Content-Type': contentType
    // }
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

const formSubmit = (e) => {
  console.log('IAMNOTDOINGMYJOB', e)
  e.preventDefault();
}

const formEl = document.getElementById('json-input');
formEl.addEventListener('submit', e => {
  e.preventDefault();

  // let contents = document.getElementById('file-input');//e.path[0][1].value;
  let input = new FormData(formEl);
  // input.append('file', e.target.file)
  // for (var [key, value] of input.entries()) { 
  //   console.log(key, value);
  // }
  // console.log(input);
  fetchCSV(input, 'multipart/form-data');
});

document.getElementById('download').addEventListener('click', e => {
  fetchDownload();
});

document.getElementById('change-input-mode').addEventListener('click', e => {
  console.log('hello')
  if (fileInput) {
    document.getElementById('text-input').style.display = 'inline';
    document.getElementById('file-input').style.display = 'none';    
  } else {
    document.getElementById('text-input').style.display = 'none';
    document.getElementById('file-input').style.display = 'inline';   
  }
  fileInput = !fileInput;
  textInput = !textInput;
})