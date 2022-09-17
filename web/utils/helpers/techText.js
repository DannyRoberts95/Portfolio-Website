const legend = [
  {target: 'A', char: `/-\\`},
  {target: 'E', char: `3`},
  {target: 'I', char: `|`},
  {target: 'O', char: `0`},
  {target: 'U', char: `|_|`},
  {target: 'D', char: `|)`},

  {target: 'N', char: `/\\/`},
  {target: 'V', char: `\\/`},
  {target: 'W', char: `\\/\\/`},
]

export default function techtext(str) {
  try {
    if (!str || typeof str !== 'string' || str.length === 0) return str
    let replacedString = str.toUpperCase()
    legend.forEach(({target, char}) => (replacedString = replacedString.replaceAll(target, char)))
    let ele = replacedString
    return ele
  } catch {
    return str
  }
}
