export const charCounter = (names: string[], character: string) => {
  return (names.join('').toLowerCase().match(new RegExp(character, 'g')) || [])
    .length
}
