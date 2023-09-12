import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 1000); })

const Form = ({ onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      const errors = {};
      if (!formData.nom) {
        errors.nom = "Veuillez entrer votre nom";
      }
      if (!formData.prenom) {
        errors.prenom = "Veuillez entrer votre prénom";
      }
      if (!formData.email) {
        errors.email = "Veuillez entrer votre email";
      }
      if (!formData.message) {
        errors.message = "Veuillez entrer un message";
      }
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError, formData]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field
            placeholder=""
            label="Nom"
            value={formData.nom}
            onChange={(value) => setFormData({ ...formData, nom: value })}
          />
          {formErrors.nom && <div className="error-message">{formErrors.nom}</div>}

          <Field
            placeholder=""
            label="Prénom"
            value={formData.prenom}
            onChange={(value) => setFormData({ ...formData, prenom: value })}
          />
          {formErrors.prenom && <div className="error-message">{formErrors.prenom}</div>}

          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          <Field
            placeholder=""
            label="Email"
            value={formData.email}
            onChange={(value) => setFormData({ ...formData, email: value })}
          />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}

          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            value={formData.message}
            onChange={(value) => setFormData({ ...formData, message: value })}
          />
          {formErrors.message && <div className="error-message">{formErrors.message}</div>}
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
