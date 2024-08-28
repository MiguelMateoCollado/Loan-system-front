import  * as Yup from "yup"
const validationSchema = Yup.object({
    interest_rate: Yup.number().min(1,"El interes debe ser mayor a 0").required("El interes es obligatorio"),
    payment_type: Yup.string().required("El tipo de pago es obligatorio"),
    delay_days: Yup.number().min(1,"El interes debe ser mayor a 0").required("Los dias de mora son obligatorios"),
    arrears_rate: Yup.number().min(1, "El interes debe ser mayor a 0").required("El porcentaje de multa es obligatorio"),
    payment_method: Yup.string().required("El metodo de pago es obligatorio"),
    amount: Yup.number().min(1, "El interes debe ser mayor a 0").required("El monto es obligatorio"),
    months: Yup.number().min(1, "El interes debe ser mayor a 0").required("Los meses son obligatorios"),
})

export default validationSchema