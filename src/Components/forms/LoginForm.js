import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {

    const navigate = useNavigate();
    // Consolidate the form fields into a single state object
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    },[])

    const [errors, setErrors] = useState({ email: '', password: '' });

    // Function to validate email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Validate email
        if (!formData.email) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            validationErrors.email = 'Enter a valid email';
        }

        // Validate password
        if (!formData.password) {
            validationErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            validationErrors.password = 'Password must be at least 6 characters long';
        }

        // Check if there are any validation errors
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted successfully with data:', formData);
            localStorage.setItem("user", JSON.stringify(formData));
            navigate("/")
            // Reset the form after successful submission
            setFormData({
                email: '',
                password: '',
                rememberMe: false,
            });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    // General change handler for form inputs
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className='container mx-auto'>
            <form className="max-w-sm mx-[2rem] md:mx-auto mt-12" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input
                            id="remember"
                            name="rememberMe"
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={handleInputChange}
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900">Remember me</label>
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default LoginForm;