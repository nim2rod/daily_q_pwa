export const formatValue = (val) => {
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'boolean' || typeof val === 'number') return val.toString();
    return JSON.stringify(val); // handles arrays and objects
}
  