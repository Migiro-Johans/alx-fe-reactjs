import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";

export default function App() {
  return (
    <div style={{ display: "grid", gap: 24, padding: 24 }}>
      <h1>Form Handling in React: Controlled vs Formik</h1>
      <RegistrationForm />
      <FormikForm />
    </div>
  );
}
