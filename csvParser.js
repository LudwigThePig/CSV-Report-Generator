module.exports = (input) => {
  input = JSON.parse(input);
  const headers = Object.keys(input).slice(0, -1);
  headers.unshift('id');
  headers.push('other');
  let counter = 0;
  let csv = [headers]
  const recurse = (node) => {
    let others = [];
    const row = Object.keys(node).slice(0, -1).map(key =>{
      //check for unique keys
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

    //Push it!
    csv.push(row);

    //if children, parse recursively
    if (node.children !== []) {
      node.children.forEach(child => recurse(child));
    } else {
      return;
    }
  }
  recurse(input);
  return csv.join('\r\n');
}