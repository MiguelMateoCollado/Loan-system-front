import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object({
  name: Yup.string().min(3).required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El email es obligatorio"),
  DNI: Yup.string()
    .matches(/^\d{11}$/, "El DNI debe tener 11 dígitos")
    .required("El DNI es obligatorio")
    .max(11),
  image: Yup.mixed()
    .required("La imagen es obligatoria")
    .test(
      "fileFormat",
      "El tipo de archivo no es soportado",
      (value) => value && SUPPORTED_FORMATS.includes(value[0].type)
    ),
  phone_number: Yup.string().matches(/^\d{10}$/, "El telefono debe tener 10 dígitos"),
});
export default validationSchema;
