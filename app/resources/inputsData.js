let inputs = [
  { id: "name", name: "name", label: "Nombre", placeholder: "Nombre..." },
  {
    id: "email",
    name: "email",
    label: "Correo electronico",
    placeholder: "Correo electronico...",
  },

  {
    id: "DNI",
    name: "DNI",
    label: "Cedula",
    placeholder: "Cedula...",
  },
  {
    type: "number",
    id: "monthly_income",
    name: "monthly_income",
    label: "Ingreso mensual",
    placeholder: "Ingreso mensual...",
  },
  {
    type: "number",
    id: "monthly_expenses",
    name: "monthly_expenses",
    label: "Gastos mensuales",
    placeholder: "Gastos mensuales...",
  },
  {
    id: "address",
    name: "address",
    label: "Dirección",
    placeholder: "Dirección...",
  },
  {
    type: "textarea",
    id: "proposite",
    name: "proposite",
    label: "Proposito",
    placeholder: "Proposito del prestamo...",
  },
];

export default inputs;
