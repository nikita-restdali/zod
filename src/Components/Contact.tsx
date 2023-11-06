import React from "react";
import ContactForm from "./ContactForm";




const Contact: React.FC = () => {

    const handleFormSubmit = (formData: {
        name: string;
        email: string;
        message: string;
    }) => {
        console.log(formData);
    };

    return (
       <div className="ContactPage">
            <ContactForm onSubmit={handleFormSubmit} />
       </div>
 
    );
};

export default Contact;
