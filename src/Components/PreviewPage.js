import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';

const PreviewPage = () => {
    const [editableData, setEditableData] = useState({
        date: '16.08.24',
        representativeName: 'Mr. Satyal',
        aadharNumber: '241535416',
        vehicleNumber: 'DL3125245LA65',
        orders: [
            { soNumber: '1235425234626', soDate: '16.08.24', quantity: '100 Pcs' },
            { soNumber: '9876543210123', soDate: '17.08.24', quantity: '50 Pcs' }
        ]
    });

    const [isPreviewMode, setIsPreviewMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleOrderInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedOrders = editableData.orders.map((order, i) => (
            i === index ? { ...order, [name]: value } : order
        ));
        setEditableData({ ...editableData, orders: updatedOrders });
    };

    const addOrder = () => {
        const newOrder = { soNumber: '', soDate: '', quantity: '' };
        setEditableData({ ...editableData, orders: [...editableData.orders, newOrder] });
    };

    const removeOrder = (index) => {
        const updatedOrders = editableData.orders.filter((_, i) => i !== index);
        setEditableData({ ...editableData, orders: updatedOrders });
    };

    const togglePreviewMode = () => {
        setIsPreviewMode(!isPreviewMode);
    };

    const downloadPDF = () => {
        const element = document.getElementById('preview-content'); // Capture the preview content
        const opt = {
            margin: 0.5,
            filename: 'Authorization_Letter.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(element).set(opt).save();
    };

    return (
        <div className='container mx-auto mt-4 p-2 md:p-4'>
            <div className="main rounded shadow-xl md:w-[60%] mx-auto">
                <div className='md:mx-[10px]'>
                    <div className='flex justify-end'>
                        <div className='flex-col'>
                            <p className='text-[1.75rem] font-bold'>Swaraj Udyog</p>
                            <p>Shop No.4,5,6 Bank Building</p>
                            <p>Kshatriya Nagar, Dhampur</p>
                            <p>Distt. Bijnore (U.P.)</p>
                            <p>Ph: +91 -9719100007</p>
                        </div>
                    </div>
                    <div className='mt-12 flex justify-center underline'>
                        <p>AUTHORIZATION LETTER</p>
                    </div>
                    <div className='mt-8 ms-8' id="preview-content">
                        {!isPreviewMode ? (
                            <>
                                <p>Date:
                                    <input
                                        className="ml-2 border-b border-gray-300 focus:outline-none"
                                        type="text"
                                        name="date"
                                        value={editableData.date}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <p className='mt-8'>To,</p>
                                <p>Supply Chain Team</p>
                                <p>Xiaomi Technology India Pvt. Ltd.</p>
                                <p>Jhajjar</p>
                                <p className='mt-8'>Reg: Authorization Letter for self Pick-up</p>
                                <p className='mt-4'>Sir,</p>
                                <p className='mt-2'>Request you to kindly allow self-pickup for below purchase orders:</p>
                                {editableData.orders.map((order, index) => (
                                    <div key={index} className='mt-2'>
                                        <p>
                                            So No.
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="soNumber"
                                                value={order.soNumber}
                                                onChange={(e) => handleOrderInputChange(index, e)}
                                            />
                                            Dated
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="soDate"
                                                value={order.soDate}
                                                onChange={(e) => handleOrderInputChange(index, e)}
                                            />
                                            Qty
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="quantity"
                                                value={order.quantity}
                                                onChange={(e) => handleOrderInputChange(index, e)}
                                            />
                                        </p>
                                        <button
                                            className="text-red-500 mt-2 text-sm"
                                            onClick={() => removeOrder(index)}
                                        >
                                            Remove Order
                                        </button>
                                    </div>
                                ))}
                                <button
                                    className="mt-4 px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                                    onClick={addOrder}
                                >
                                    Add Order
                                </button>
                                <p className='mt-6'>
                                    To my representative
                                    <input
                                        className="ml-2 border-b border-gray-300 focus:outline-none"
                                        type="text"
                                        name="representativeName"
                                        value={editableData.representativeName}
                                        onChange={handleInputChange}
                                    />
                                    having Aadhar No.
                                    <input
                                        className="ml-2 border-b border-gray-300 focus:outline-none"
                                        type="text"
                                        name="aadharNumber"
                                        value={editableData.aadharNumber}
                                        onChange={handleInputChange}
                                    />
                                </p>
                                <p className='mt-2'>
                                    Also I would like to request you to kindly generate E-Way bill with vehicle no.
                                    <input
                                        className="ml-2 border-b border-gray-300 focus:outline-none"
                                        type="text"
                                        name="vehicleNumber"
                                        value={editableData.vehicleNumber}
                                        onChange={handleInputChange}
                                    />
                                </p>
                            </>
                        ) : (
                            <>
                                <p>Date: {editableData.date}</p>
                                <p className='mt-8'>To,</p>
                                <p>Supply Chain Team</p>
                                <p>Xiaomi Technology India Pvt. Ltd.</p>
                                <p>Jhajjar</p>
                                <p className='mt-8'>Reg: Authorization Letter for self Pick-up</p>
                                <p className='mt-4'>Sir,</p>
                                <p className='mt-2'>Request you to kindly allow self-pickup for below purchase orders:</p>
                                {editableData.orders.map((order, index) => (
                                    <div key={index} className='mt-2'>
                                        <p>So No. {order.soNumber} Dated {order.soDate} Qty- {order.quantity}</p>
                                    </div>
                                ))}
                                <p className='mt-6'>To my representative {editableData.representativeName} having Aadhar No. {editableData.aadharNumber}</p>
                                <p className='mt-2'>Also I would like to request you to kindly generate E-Way bill with vehicle no. {editableData.vehicleNumber}</p>
                            </>
                        )}

                        <p className='mt-8'>Regards,</p>
                        <p className='mt-20'>Bhawna Maheshwari</p>
                        <p>Swaraj Udyog</p>
                        <p>Dhampur</p>
                    </div>
                    <div className='flex justify-end me-4 mt-4 mb-4'>
                        <button
                            onClick={togglePreviewMode}
                            className="inline-flex mb-4 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                        >
                            {isPreviewMode ? 'Edit' : 'Preview'}
                        </button>
                        {isPreviewMode && (
                            <button
                                onClick={downloadPDF}
                                className="inline-flex mb-4 ms-4 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                            >
                                Download PDF
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PreviewPage;
