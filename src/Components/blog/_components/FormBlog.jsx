import { getDatabase, push, ref, set } from 'firebase/database';
import { MuiTelInput } from 'mui-tel-input';
import React, { useState } from 'react';
import app from '../../../firebaseConfig';

const FormBlog = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "+971",
        message: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const db = getDatabase(app);

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = "Name is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.phone) errors.phone = "Phone number is required";
        return errors;
    };

    const handleHelpSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        setFormErrors({});
        setSubmitSuccess(false);

        try {
            const newDocRef = push(ref(db, 'special/offers'));
            await set(newDocRef, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
            });
            setSubmitSuccess(true);
            setFormData({ name: "", email: "", phone: "+971", message: "" }); // Reset form
        } catch (error) {
            console.error('Error saving data:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            <form className="help-form" onSubmit={handleHelpSubmit}>
                <input
                    type="text"
                    placeholder={"Full Name"}
                    name="name"
                    className="help-input"
                    value={formData.name}
                    onChange={handleInputChange}
                />
                {formErrors.name && <div className="error">{formErrors.name}</div>}

                <MuiTelInput
                    sx={{
                        backgroundColor: "white",
                        border: "none",
                        outline: "none",
                        borderRadius: "20px",
                        margin: "8px 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "none",
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { border: 'none' },
                            '&:hover fieldset': { border: 'none' },
                            '&.Mui-focused fieldset': { border: 'none' },
                        },
                    }}
                    placeholder={"Phone"}
                    name="phone"
                    className="help-input1"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e })}  // تحديث مباشر لقيمة الهاتف
                />
                {formErrors.phone && <div className="error">{formErrors.phone}</div>}

                <input
                    type="email"
                    placeholder={"Email"}
                    name="email"
                    className="help-input"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                {formErrors.email && <div className="error">{formErrors.email}</div>}

                <button className="help-submit" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "SUBMIT"}
                </button>

                {submitSuccess && <div className="success">Form submitted successfully!</div>}
            </form>
        </>
    );
}

export default FormBlog;
