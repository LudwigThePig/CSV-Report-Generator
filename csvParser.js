module.exports = (input) => {
  input = JSON.parse(input);
  const headers = Object.keys(input).slice(0, -1);
  headers.unshift('id');
  let counter = 0;
  let csv = [headers]
  const recurse = (node) => {
    const row = Object.keys(node).slice(0, -1).map(key => node[key]);
    //add id
    row.unshift(counter.toString());
    counter++;

    csv.push(row);
    if (node.children !== []) {
      node.children.forEach(child => recurse(child));
    } else {
      return;
    }
  }
  recurse(input);
  return csv.join('\r\n');
}