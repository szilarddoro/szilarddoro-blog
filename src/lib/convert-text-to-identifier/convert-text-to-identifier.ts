export default function convertTextToIdentifier(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[,\/]/g, '')
    .replace(/ /g, `-`)
}
