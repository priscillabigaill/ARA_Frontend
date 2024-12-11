import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import images from '../constants/images';
import { useSpring, animated } from '@react-spring/web'
import { useState } from 'react';
import DiffusionBar from '../diffusionBar';
import axios from 'axios';

function Detector() {

  const slideIn = useSpring({
      config: {
          tension: 170,
          friction: 60
      },
      from: { y: -50, opacity: 0 },
      to: { y: 0, opacity: 1 },
  })

  const slideIn2 = useSpring({
      config: {
          tension: 170,
          friction: 60
      },
      from: { y: -50, opacity: 0 },
      delay: 250,
      to: { y: 0, opacity: 1 },
  })

  // const fadeIn= useSpring({ 
  //     config: {
  //       duration: 1200,
  //     },
  //     from: { opacity: 0 },
  //     to: { opacity: 1 },
  // })

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewURL, setPreviewURL] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const hiddenFileInput = useRef(null);
  const navigate = useNavigate();

  const handleClick = () => hiddenFileInput.current.click();

  const handleChange = async (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      setPreviewURL(URL.createObjectURL(fileUploaded));
      setUploadedFile(fileUploaded);
      setLoading(true);

      try {
        const formData = new FormData();
        formData.append('file', fileUploaded);

        const response = await axios.post('http://127.0.0.1:8000/images/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response from server:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error.response || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const diffusionData = {
    "vgg9 (recommended)": { cyclegan: 0.06, dalle: 0.01, midjourney: 0.01, real: 0.01, stablediffusion: 0.91 },
    efficientnet: { cyclegan: 0.76, dalle: 0.0, midjourney: 0.01, real: 0.0, stablediffusion: 0.23 },
    mobilenet: { cyclegan: 0.1, dalle: 0.0, midjourney: 0.0, real: 0.0, stablediffusion: 0.89 },
    resnet50: { cyclegan: 0.75, dalle: 0.0, midjourney: 0.12, real: 0.0, stablediffusion: 0.12 },
    vgg16: { cyclegan: 0.95, dalle: 0.0, midjourney: 0.0, real: 0.0, stablediffusion: 0.05 },
  };

  const handleModelSelect = (model) => {
    setSelectedModel(selectedModel === model ? null : model);
  };

  const fadeIn = useSpring({
    config: { duration: 1200 },
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className='min-h-screen w-full bg-cream pb-12'>
      <div classname='fixed'>
        <div className='flex items-center h-20 bg-pink'>
          <div className='hidden md:flex'>
            <button className='w-fit px-8 ml-12 h-full bg-pink hover:bg-pink-100'
              onClick={() => navigate('/')}>
              <p className='font-inter text-xl'>
                      Home
              </p>    
            </button>
                
            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/detector')}>
                <p className='font-inter text-xl'>
                    AI Art Detector
                </p>
            </button>

            <button className='w-fit px-8 h-full bg-pink hover:bg-pink-100'
            onClick={() => navigate('/database')}>
                <p className='font-inter text-xl'>
                    Image Database
                </p>
            </button>
          </div>
                
                <div className='ml-20 md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {/* hamburger icon */}
                        <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M4 6h16M4 12h16M4 18h16'
                        />
                        </svg>
                    </button>
                </div>

                <img 
                className='ml-auto mr-8 h-20 w-20'
                src={images.aralogo} alt='aralogo'
                style={{ objectFit: 'contain'}} 
                />
            </div>

            {/* Modal */}
      {isOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
          onClick={() => setIsOpen(false)}
        >
          <div
            className='bg-white rounded-lg w-3/4 max-w-sm'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Close Button */}
            <div className='flex justify-end p-2'>
              <button onClick={() => setIsOpen(false)}>
                <svg
                  className='w-6 h-6 text-gray-700'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className='flex flex-col items-center p-4'>

                <button
                    className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                    onClick={() => {
                    navigate('/');
                    setIsOpen(false);
                    }}
                >
                    Home
                </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/detector');
                  setIsOpen(false);
                }}
              >
                AI Art Detector
              </button>

              <button
                className='w-full py-2 text-center text-xl font-inter hover:bg-gray-200'
                onClick={() => {
                  navigate('/database');
                  setIsOpen(false);
                }}
              >
                Image Database
              </button>
            </div>
          </div>
        </div>
      )}

        </div>

        <div className='flex mt-10'>

            <div className='ml-20 mr-10 flex flex-col w-full'>
                <animated.p
                    className="flex-wrap text-6xl font-inter font-extrabold text-blue-100"
                    style={{ ...slideIn }}
                    >
                    AI-generated artwork detector
                </animated.p>

                <animated.div
                    className="mt-20 mb-12 flex rounded-[1.5rem] bg-blue-300 h-fit w-[32rem] p-8 shadow-md"
                    style={{ ...fadeIn }}
                    >
                    {previewURL ? (
                        <div className="flex">
                            <img
                                src={previewURL}
                                alt="Uploaded Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                            />
                        </div>
                    ) : (
                <>    
                    <animated.div
                        className="flex flex-col items-center justify-center w-[28rem] h-[25rem] bg-white rounded-xl shadow-sm border-dotted border-4 border-blue-300"
                        style={{ ...fadeIn }}
                    >
                    <img
                    className='opacity-20 h-30 w-45 justify-center'
                    src={images.monalisa} alt='monalisa'
                    style={{ objectFit: 'contain'}}
                    />
                        <div className="absolute flex flex-col items-center text-center">
                        <label htmlFor="button-upload" className="cursor-pointer">
                            <button
                            className="h-20 w-20 flex items-center justify-center rounded-full shadow-mdfocus:outline-none"
                            style={{ objectFit: "contain" }}
                            onClick={handleClick}
                            >
                            <img
                                className="h-15 w-15"
                                src={images.upload}
                                alt="upload"
                                style={{ objectFit: "contain" }}
                            /> 
                            </button>
                            </label>
                            <input
                                type="file"
                                id="button-upload"
                                onChange={handleChange}
                                ref={hiddenFileInput}
                                style={{display: 'none'}} // Make the file input element invisible
                            />
                            <p className="text-lg font-medium text-gray-700 mt-4">
                                Drag & drop files or{' '}
                                <span className="text-purple cursor-pointer hover:underline">
                                Browse
                                </span>
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                Supported formats: JPEG, PNG, JPG
                            </p>
                        </div>
                    
                    </animated.div>
                    </>
                    )}
                    </animated.div>
            </div>

            <div className='mr-20 ml-10 flex flex-col items-center w-full'>
                <animated.div
                    className="min-h-[6rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                    style={{ ...fadeIn }}
                    >

                    <div className="w-full bg-blue-200 rounded-t-xl p-2">
                        <animated.p
                        className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                        style={{ ...fadeIn }}
                        >
                        Result
                        </animated.p>
                    </div>

                    <div className="relative flex flex-row items-center justify-between w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                        {loading ? (
                                // <div className='flex justify-center items-center'>
                                    <div className="mx-auto w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                                // </div>
                        ) : (
                        <>
                            <p className="text-lg font-bold text-black">
                            The image is: <span className="text-blue-400">Likely AI-generated</span>
                            </p>

                            <div className="flex items-center justify-center w-16 h-16 bg-blue-400 text-white font-bold text-lg rounded-[1.5rem]">
                            100%
                            </div>
                        </>
                        
                        )}
                    </div>
                </animated.div>

                <animated.div
                  className="h-full mt-[3.0rem] w-full bg-blue-200 rounded-xl shadow-sm flex flex-col items-center justify-center"
                  style={{ ...fadeIn }}
                >
                  <div className="w-full bg-blue-200 rounded-t-xl p-2">
                    <animated.p
                      className="pl-3 mr-auto text-xl font-inter font-semibold text-gray-800"
                      style={{ ...fadeIn }}
                    >
                      Diffusion
                    </animated.p>
                  </div>

                  <div className="h-full relative flex flex-col items-center justify-center w-full bg-blue-300 px-6 py-4 rounded-b-xl shadow-inner">
                    {loading ? (
                      <div className="w-10 h-10 border-4 border-gray-300 border-t-purple rounded-full animate-spin"></div>
                    ) : (
                      <div className="flex flex-col space-y-6 w-full max-w-md">
                        {Object.keys(diffusionData).map((model) => (
                          <div key={model} className="w-full mb-4">
                            <button
                              className="w-full text-left p-4 bg-blue-400 text-white rounded-lg font-bold"
                              onClick={() => handleModelSelect(model)}
                            >
                              {model}
                            </button>
                            {selectedModel === model && (
                              <div className="mt-2 bg-white rounded-lg p-4 shadow">
                                {Object.entries(diffusionData[model]).map(([label, value]) => (
                                  <div key={label} className="flex items-center space-x-4 mb-4">
                                    {/* Label */}
                                    <span className="text-gray-800 w-2/5 text-left truncate">{label}</span>

                                    {/* Gradient loading bar */}
                                    <div className="w-2/5 h-3 bg-gray-200 rounded-full relative">
                                      <div
                                        className="absolute top-0 left-0 h-full rounded-full"
                                        style={{
                                          width: `${(value * 100).toFixed(1)}%`,
                                          background: 'linear-gradient(to left, #fbbd1c, #ed4a8f)',
                                        }}
                                      ></div>
                                    </div>

                                    {/* Percentage */}
                                    <span className="text-blue-600 font-semibold w-1/5 text-right">{(value * 100).toFixed(1)}%</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </animated.div>
            </div>
        </div>
        
    </div>
  )
}

export default Detector
