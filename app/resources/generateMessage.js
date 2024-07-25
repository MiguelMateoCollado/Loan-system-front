export default async function generateMessage(label) {
  let target = await label.split("_").slice(1, -1);
  return "El" + " (" + target.join(" ") + ") " + "que ingresaste ya existe.";
}
