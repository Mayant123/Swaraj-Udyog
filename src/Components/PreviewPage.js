import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import html2pdf from 'html2pdf.js';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import { default as React, useEffect, useState } from 'react';
import stamp from "../../src/assets/stamp_sign.png";
import Uploadfile from "./Uploadfile";
import letterPad from "../assets/sriji_LetterPad.png"

const PreviewPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const loggedInEmail = user.email;

    const [pdfData, setPdfData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const companyByEmail = {
        "shreeji@gmail.com": "Shree Ji",
        "northernimpex@gmail.com": "Northern Impex",
        "swarajudyog@gmail.com": "Swaraj Udyog"
    };
    const [signedPdfUrl, setSignedPdfUrl] = useState(null);

    const handlePdfReady = (url) => {
        setSignedPdfUrl(url);
    };
    const defaultCompany = companyByEmail[loggedInEmail] || "Swaraj Udyog";

    // console.log('Logged In Email:', loggedInEmail);
    // console.log('Company By Email:', companyByEmail);
    // console.log('Default Company:', companyByEmail[loggedInEmail]);


    const [editableData, setEditableData] = useState({
        date: '16.08.24',
        representativeName: 'Mr. Satyal',
        idType: 'aadhar',
        idNumber: '241535416',
        vehicleNumber: 'DL3125245LA65',
        location: 'Jhajjar',
        companyName: defaultCompany,
        order: { soNumber: '1235425234626', soDate: '2024-08-16', quantity: '100 Pcs' }
    });

    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        setEditableData(prevData => ({
            ...prevData,
            companyName: defaultCompany
        }));
    }, [loggedInEmail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleOrderInputChange = (e) => {
        const { name, value } = e.target;
        setEditableData({ ...editableData, order: { ...editableData.order, [name]: value } });
    };

    const togglePreviewMode = () => {
        setIsPreviewMode(!isPreviewMode);
    };

    const downloadPDF = () => {
        const element = document.getElementById('pdf-content'); // Capture the preview content
        const opt = {
            margin: 0.2,
            filename: `Sno.${editableData.order.soNumber}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 4 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        setTimeout(() => {
            html2pdf().from(element).set(opt).save();
        }, 500);
    };


    return (
        <>
            <div className='container mx-auto mt-4 p-2 md:p-4' id="pdf-content">
                <div className="main rounded shadow-xl md:w-[100%] mx-auto">
                    <div className='md:mx-[10px]'>
                        <div
                            className='absolute top-0 left-0 w-full h-full bg-cover bg-center'
                            style={{
                                backgroundImage: `url(${letterPad})`,
                                backgroundSize: 'contain',
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: 'center',
                                zIndex: -1,
                                height: "61rem",
                                
                            }}
                        >
                            {/* This container ensures that the background image covers the whole area */}
                        </div>
                        <div className='relative h-[64rem] top-[-40px]  '>
                            <div className='flex justify-end'>
                                <div className='flex-col'>
                                    <p className='text-[1.75rem] font-bold'>{editableData.companyName}</p> {/* Display the company name dynamically */}
                                    <p>Shop No.4,5,6 Bank Building</p>
                                    <p>Kshatriya Nagar, Dhampur</p>
                                    <p>Distt. Bijnore (U.P.)</p>
                                    <p>Ph: +91 -9719100007</p>
                                </div>
                            </div>
                            <div className='mt-12 flex justify-center underline'>
                                <p>AUTHORIZATION LETTER</p>
                            </div>
                            <div className='mt-8 ms-2 p-4' id="preview-content">
                                {!isPreviewMode ? (
                                    <>
                                        <p>Date:
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="date"
                                                name="date"
                                                value={editableData.date}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p className='mt-8'>To,</p>
                                        <p>Supply Chain Team</p>
                                        <p>Xiaomi Technology India Pvt. Ltd.</p>
                                        <p>
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="location"
                                                value={editableData.location}
                                                onChange={handleInputChange}
                                            />
                                        </p>
                                        <p className='mt-8'>Reg: Authorization Letter for self Pick-up</p>
                                        <p className='mt-4'>Sir,</p>
                                        <p className='mt-2'>Request you to kindly allow self-pickup for below purchase orders:</p>
                                        <div className='mt-2'>
                                            <p>
                                                So No.
                                                <input
                                                    className="ml-2 border-b border-gray-300 focus:outline-none"
                                                    type="text"
                                                    name="soNumber"
                                                    value={editableData.order.soNumber}
                                                    onChange={handleOrderInputChange}
                                                />
                                                Dated
                                                <input
                                                    className="ml-2 border-b border-gray-300 focus:outline-none"
                                                    type="date"
                                                    name="soDate"
                                                    value={editableData.order.soDate}
                                                    onChange={handleOrderInputChange}
                                                />
                                                Qty
                                                <input
                                                    className="ml-2 border-b border-gray-300 focus:outline-none"
                                                    type="text"
                                                    name="quantity"
                                                    value={editableData.order.quantity}
                                                    onChange={handleOrderInputChange}
                                                />
                                            </p>
                                        </div>
                                        <p className='mt-6'>
                                            To my representative
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="representativeName"
                                                value={editableData.representativeName}
                                                onChange={handleInputChange}
                                            />
                                            having
                                        </p>
                                        <div className="mt-2">
                                            <label className="mr-2">
                                                <input
                                                    type="radio"
                                                    name="idType"
                                                    value="aadhar"
                                                    checked={editableData.idType === 'aadhar'}
                                                    onChange={handleInputChange}
                                                />
                                                Aadhar No.
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name="idType"
                                                    value="pan"
                                                    checked={editableData.idType === 'pan'}
                                                    onChange={handleInputChange}
                                                />
                                                PAN No.
                                            </label>
                                            <input
                                                className="ml-2 border-b border-gray-300 focus:outline-none"
                                                type="text"
                                                name="idNumber"
                                                value={editableData.idNumber}
                                                onChange={handleInputChange}
                                            />
                                        </div>
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
                                        <div className="mt-4">
                                            <p>Select Company:</p>
                                            <label className="inline-flex items-center">
                                                <input
                                                    type="radio"
                                                    name="companyName"
                                                    value="Shree Ji"
                                                    checked={editableData.companyName === 'Shree Ji'}
                                                    onChange={handleInputChange}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">Shree Ji</span>
                                            </label>
                                            <label className="inline-flex items-center ml-4">
                                                <input
                                                    type="radio"
                                                    name="companyName"
                                                    value="Northern Impex"
                                                    checked={editableData.companyName === 'Northern Impex'}
                                                    onChange={handleInputChange}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">Northern Impex</span>
                                            </label>
                                            <label className="inline-flex items-center ml-4">
                                                <input
                                                    type="radio"
                                                    name="companyName"
                                                    value="Swaraj Udyog"
                                                    checked={editableData.companyName === 'Swaraj Udyog'}
                                                    onChange={handleInputChange}
                                                    className="form-radio"
                                                />
                                                <span className="ml-2">Swaraj Udyog</span>
                                            </label>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p>Date: <span className="font-bold">{editableData.date}</span></p>
                                        <p className='mt-8'>To,</p>
                                        <p>Supply Chain Team</p>
                                        <p>Xiaomi Technology India Pvt. Ltd.</p>
                                        <p>{editableData.location}</p>
                                        <p className='mt-8'>Reg: Authorization Letter for self Pick-up</p>
                                        <p className='mt-4'>Sir,</p>
                                        <p className='mt-2'>Request you to kindly allow self-pickup for below purchase orders:</p>
                                        <div className='mt-2'>
                                            <p>
                                                So No. <span className="font-bold">{editableData.order.soNumber}</span> Dated <span className="font-bold">{editableData.order.soDate}</span> Qty <span className="font-bold">{editableData.order.quantity}</span>
                                            </p>
                                        </div>
                                        <p className='mt-6'>To my representative <span className='font-bold'>{editableData.representativeName}</span> having <span className='font-bold'>{editableData.idType === 'aadhar' ? 'Aadhar No.' : 'PAN No.'}</span><span className='font-bold'>{editableData.idNumber}</span></p>
                                        <p className='mt-2'>Also I would like to request you to kindly generate E-Way bill with vehicle no. <span className="font-bold">{editableData.vehicleNumber}</span></p>
                                        {/* <p className='mt-4'>Company: {editableData.companyName}</p> Display selected company */}
                                    </>
                                )}

                                <p className='mt-8'>Regards,</p>
                                <div className='relative h-auto w-auto mt-2'>
                                    <img src={stamp} alt="No Image found" className='absolute h-auto w-[9rem] ms-[-25px]' />
                                </div>
                                <p className='mt-24'>Bhawna Maheshwari</p>
                                <p>{editableData.companyName}</p> {/* Reflect selected company */}
                                <p>Dhampur</p>
                            </div>
                        </div>
                    </div>
                    {pdfUrl && (
                        <div className='px-4' style={{
                            width: "100%",
                            height: "100%",
                            overflow: "auto"
                        }}>

                            <Worker workerUrl={pdfjsWorker}>
                                <Viewer fileUrl={pdfUrl} defaultScale={1.0} />
                            </Worker>
                        </div>)}
                </div>
            </div>
            <div className='flex justify-center'>
                {isPreviewMode ?
                    <div className='flex flex-col items-center gap-2'>
                        <p className='font-bold'>Select Invoice :</p>
                        <button className="inline-flex mb-4 ms-4 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                        >
                            <Uploadfile pdfData={pdfData} setPdfData={setPdfData} pdfUrl={pdfUrl} setPdfUrl={setPdfUrl} />
                        </button>
                    </div> : ""}
            </div>
            <div className='flex justify-center me-4 mt-4 mb-4 p-8'>
                <button
                    onClick={togglePreviewMode}
                    className="inline-flex mb-4 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                >
                    {isPreviewMode ? 'Edit' : 'Preview'}
                </button>
                {isPreviewMode && (
                    <div>
                        <button
                            onClick={downloadPDF}
                            className="inline-flex mb-4 ms-4 items-center px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white"
                        >
                            Download PDF
                        </button>
                    </div>

                )}

            </div>
        </>
    );
}

export default PreviewPage;
