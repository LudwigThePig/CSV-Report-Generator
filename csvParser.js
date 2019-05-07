module.exports = (input) => {
  const headers = Object.keys(input).slice(0, -1);
  let csv = [headers]
  const recurse = (node) => {
    const row = Object.keys(node).slice(0, -1).map(key => node[key]);
    csv.push(row);
    if (node.children !== []) {
      console.log('hi :)')
      node.children.forEach(child => recurse(child));
    } else {
      return;
    }
  }
  recurse(input);
  return csv.join('\n');
}