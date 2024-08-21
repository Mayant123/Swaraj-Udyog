import React, { useState } from 'react';

const Form = () => {
    const [orders, setOrders] = useState([{ orderNumber: '', quantity: '' }]);
    const [formData, setFormData] = useState({
        date: '',
        teamName: '',
        companyName: '',
        companyLocation: '',
        firstName: '',
        lastName: '',
        vehicleNumber: ''
    });
    const [errors, setErrors] = useState({});

    // Handle input changes for a specific order
    const handleOrderInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedOrders = [...orders];
        updatedOrders[index] = {
            ...updatedOrders[index],
            [name]: value,
        };
        setOrders(updatedOrders);
    };

    // Add a new empty order
    const handleAddOrder = () => {
        setOrders([...orders, { orderNumber: '', quantity: '' }]);
    };

    // Delete an order
    const handleDeleteOrder = (index) => {
        const updatedOrders = orders.filter((_, i) => i !== index);
        setOrders(updatedOrders);
    };

    // Handle form field changes
    const handleFormFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Form validation
    const validateForm = () => {
        let newErrors = {};

        // Required field validations
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.teamName) newErrors.teamName = 'Team Name is required';
        if (!formData.companyName) newErrors.companyName = 'Company Name is required';
        if (!formData.companyLocation) newErrors.companyLocation = 'Company Location is required';
        if (!formData.firstName) newErrors.firstName = 'First Name is required';
        if (!formData.lastName) newErrors.lastName = 'Last Name is required';
        if (!formData.vehicleNumber) newErrors.vehicleNumber = 'Vehicle Number is required';

        // Order validation
        orders.forEach((order, index) => {
            if (!order.orderNumber) newErrors[`orderNumber-${index}`] = 'Order Number is required';
            if (!order.quantity) newErrors[`quantity-${index}`] = 'Quantity is required';
        });

        return newErrors;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            // No errors, proceed with form submission
            console.log('Form Data:', formData);
            console.log('Orders:', orders);
        } else {
            // Set errors and prevent submission
            setErrors(formErrors);
        }
    };

    return (
        <div className='container mx-auto'>
            <form className="max-w-md mx-[2rem] md:mx-auto mt-20" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        value={formData.date}
                        onChange={handleFormFieldChange}
                        name="date"
                        id="floating_date"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_date" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date</label>
                    {errors.date && <p className="text-red-600 text-xs">{errors.date}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={formData.teamName}
                        onChange={handleFormFieldChange}
                        type="text"
                        name="teamName"
                        id="floating_teamName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_teamName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Supply Chain Team Name</label>
                    {errors.teamName && <p className="text-red-600 text-xs">{errors.teamName}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={formData.companyName}
                        onChange={handleFormFieldChange}
                        type="text"
                        name="companyName"
                        id="repeat_companyName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="repeat_companyName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Name</label>
                    {errors.companyName && <p className="text-red-600 text-xs">{errors.companyName}</p>}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={formData.companyLocation}
                        onChange={handleFormFieldChange}
                        type="text"
                        name="companyLocation"
                        id="floating_companyPlace"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_companyPlace" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Location</label>
                    {errors.companyLocation && <p className="text-red-600 text-xs">{errors.companyLocation}</p>}
                </div>
                {/* Orders */}
                <div className="flex gap-4">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={orders[orders.length - 1]?.orderNumber || ''}
                            onChange={(e) => handleOrderInputChange(orders.length - 1, e)}
                            name="orderNumber"
                            id="floating_orderNumber"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="floating_orderNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Order Number</label>
                        {errors[`orderNumber-${orders.length - 1}`] && <p className="text-red-600 text-xs">{errors[`orderNumber-${orders.length - 1}`]}</p>}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={orders[orders.length - 1]?.quantity || ''}
                            onChange={(e) => handleOrderInputChange(orders.length - 1, e)}
                            name="quantity"
                            id="floating_quantity"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label htmlFor="floating_quantity" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Order Quantity</label>
                        {errors[`quantity-${orders.length - 1}`] && <p className="text-red-600 text-xs">{errors[`quantity-${orders.length - 1}`]}</p>}
                    </div>
                    <button onClick={handleAddOrder} type="button" className="w-[110px] h-[35px] text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] px-[2px] py-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Add</button>
                </div>
                {/* Order List */}
                <div>
                    {orders.map((order, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center my-4 p-4 bg-gray-100 rounded-lg"
                        >
                            <div>
                                <p className="text-sm font-medium">Order Number: {order.orderNumber}</p>
                                <p className="text-sm">Quantity: {order.quantity}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteOrder(index)}
                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-4 py-2"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formData.firstName}
                            onChange={handleFormFieldChange}
                            type="text"
                            name="firstName"
                            id="floating_firstName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="floating_firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First Name</label>
                        {errors.firstName && <p className="text-red-600 text-xs">{errors.firstName}</p>}
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            value={formData.lastName}
                            onChange={handleFormFieldChange}
                            type="text"
                            name="lastName"
                            id="floating_lastName"
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            placeholder=" "
                            required
                        />
                        <label htmlFor="floating_lastName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last Name</label>
                        {errors.lastName && <p className="text-red-600 text-xs">{errors.lastName}</p>}
                    </div>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        value={formData.vehicleNumber}
                        onChange={handleFormFieldChange}
                        type="text"
                        name="vehicleNumber"
                        id="floating_vNumber"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label htmlFor="floating_vNumber" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Vehicle Number</label>
                    {errors.vehicleNumber && <p className="text-red-600 text-xs">{errors.vehicleNumber}</p>}
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
            </form>
        </div>
    );
};

export default Form;
