import React, { useState } from "react";
import { z } from "zod";

interface ContactFormProps {
  onSubmit: (formData: { name: string; email: string; message: string }) => void;
}

const formDataSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name can't exceed 50 characters"),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message can't exceed 500 characters"),
});

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = formDataSchema.safeParse(formData);

    if (result.success) {
      console.log("Form data is valid:", result.data);
      onSubmit(result.data);
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFormErrors({
        name: "",
        email: "",
        message: "",
      });
    } else {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setFormErrors({
        name: fieldErrors.name || "",
        email: fieldErrors.email || "",
        message: fieldErrors.message || "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {formErrors.name && <div className="error-message">{formErrors.name}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {formErrors.email && <div className="error-message">{formErrors.email}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        {formErrors.message && <div className="error-message">{formErrors.message}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ContactForm;
