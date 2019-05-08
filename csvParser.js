module.exports = (input) => {
  input = JSON.parse(input);
  //the names of fields
  const headers = Object.keys(input).slice(0, -1);
  //add id and other fields
  headers.unshift('id');
  let counter = 0;
  headers.push('other');

  let csv = [headers];

  const recurse = (node) => {
    let others = [];
    const rowKeys = Object.keys(node).slice(0, -1);

    //replace empty fields with null
    headers.slice(1).forEach((header, i) => {
      if (!rowKeys.includes(header) && header !== 'other') {
        node[header] = 'null';
        rowKeys.splice( i, 0, header );      }
    });

    //the main parsing function
    const row = rowKeys.map(key =>{
      //check for unique fields and push to other
      if (!headers.includes(key)) {
        others.push(node[key]);
      } else {
        return node[key];
      }
    });
    
    //add id and other to the row
    row.unshift(counter.toString());
    counter++;
    row.push(others.join(" "));

    //Push it! Bop it!
    csv.push(row);

    //if node has children, parse children
    if (node.children !== []) {
      node.children.forEach(child => recurse(child));
    } else {
      return;
    }
  }
  recurse(input);
  return csv.join('\r\n');
}