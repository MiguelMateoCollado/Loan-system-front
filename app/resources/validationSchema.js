import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "El nombre debe tener mas de 3 letras.")
    .required("El nombre es obligatorio"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("El email es obligatorio"),
  DNI: Yup.string()
    .matches(/^\d{11}$/, "El DNI debe tener 11 dígitos")
    .required("El DNI es obligatorio")
    .max(11),
  proposite: Yup.string()
    .min(20, "Debe tener un minimo de 20 caracteres.")
    .required("El proposito de su prestamo es obligatorio"),
  image: Yup.mixed()
    .required("Añade una foto de perfil.")
    .test(
      "fileFormat",
      "El tipo de archivo no es soportado",
      (value) => value && SUPPORTED_FORMATS.includes(value[0]?.type)
    ),
  monthly_expenses: Yup.number()
    .required("El campo gastos es obligatorio")
    .min(0, "Los gastos deben ser 0 o mayores"),

  monthly_income: Yup.number()
    .required("El campo gastos es obligatorio")
    .positive("Los ingresos deben ser mayores que 0")
    .moreThan(
      Yup.ref("monthly_expenses"),
      "Los ingresos deben ser mayores que los gastos"
    ),

  dni_images: Yup.mixed()
    .test(
      "fileCount",
      "Por favor, sube imágenes de ambas caras del documento.",
      (value) => value && value.length === 2
    )
    .test(
      "fileType",
      "Los archivos deben ser imágenes",
      (value) =>
        value &&
        Array.from(value).every((file) => SUPPORTED_FORMATS.includes(file.type))
    ),
  phone_number: Yup.string().matches(
    /^\d{10}$/,
    "El telefono debe tener 10 dígitos"
  ),
}).test(
  "ingresos-mayor-que-gastos",
  "Los ingresos deben ser mayores que los gastos",
  function (values) {
    const { monthly_income, monthly_expenses } = values;
    return monthly_income > monthly_expenses;
  }
);
export default validationSchema;
