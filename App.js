import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import * as fabric from 'fabric';

function App() {
  const canvasRef = useRef(null);
  const fabricRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current);
      if (uploadedImageUrl) {
        fabric.Image.fromURL(uploadedImageUrl, (img) => {
          img.set({
            left: 0,
            top: 0,
            scaleX: canvasRef.current.width / img.width,
            scaleY: canvasRef.current.height / img.height
          });
          fabricRef.current.clear(); 
          fabricRef.current.add(img);
          fabricRef.current.renderAll();
        }, { crossOrigin: 'Anonymous' });
      }

      return () => {
        if (fabricRef.current) {
          fabricRef.current.dispose();
        }
      };
    }
  }, [uploadedImageUrl]);

  useEffect(() => {
    if (selectedFilter) {
      applyFilter(selectedFilter);
    }
  }, [selectedFilter]);

  const applyFilter = async (filterType) => {
    if (!fabricRef.current) return;

    const objects = fabricRef.current.getObjects();
    if (objects.length > 0) {
      const fabricImage = objects[0];
      fabricImage.filters = [];

      switch (filterType) {
        case 'grayscale':
          fabricImage.filters.push(new fabric.Image.filters.Grayscale());
          break;
        case 'blur':
          fabricImage.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 }));
          break;
        case 'invert':
          fabricImage.filters.push(new fabric.Image.filters.Invert());
          break;
        case 'sharpen':
          fabricImage.filters.push(new fabric.Image.filters.Sharpen());
          break;
        case 'edge':
          fabricImage.filters.push(new fabric.Image.filters.EdgeEnhance());
          break;
        default:
          break;
      }

      fabricImage.applyFilters();
      fabricRef.current.renderAll();
    }
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('http://localhost:8080/api/images/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      console.log(result.message);
      setUploadedImageUrl(result.imageUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Filter App</h1>
        <input type="file" onChange={handleFileUpload} />
        <div className="button-row">
          <button onClick={() => setSelectedFilter('grayscale')}>Grayscale</button>
          <button onClick={() => setSelectedFilter('blur')}>Blur</button>
          <button onClick={() => setSelectedFilter('invert')}>Invert Colors</button>
          <button onClick={() => setSelectedFilter('sharpen')}>Sharpen</button>
          <button onClick={() => setSelectedFilter('edge')}>Edge Detection</button>
        </div>
        <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #ddd' }} />
      </header>
    </div>
  );
}

export default App;



// import React, { useRef, useEffect, useState } from 'react';
// import './App.css';
// import * as fabric from 'fabric';
// import carImage from './image/car2.jpg';

// function App() {
//   const canvasRef = useRef(null);
//   const fabricRef = useRef(null);
//   const [selectedFilter, setSelectedFilter] = useState(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       fabricRef.current = new fabric.Canvas(canvasRef.current);
//       fabric.Image.fromURL(carImage, (img) => {
//         img.set({
//           left: 0,
//           top: 0,
//           scaleX: canvasRef.current.width / img.width,
//           scaleY: canvasRef.current.height / img.height
//         });
//         fabricRef.current.add(img);
//         fabricRef.current.renderAll();
//       }, { crossOrigin: 'Anonymous' });

//       return () => {
//         if (fabricRef.current) {
//           fabricRef.current.dispose();
//         }
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedFilter) {
//       applyFilter(selectedFilter);
//     }
//   }, [selectedFilter]);

//   const applyFilter = async (filterType) => {
//     if (!fabricRef.current) return;

//     const objects = fabricRef.current.getObjects();
//     if (objects.length > 0) {
//       const fabricImage = objects[0];
//       fabricImage.filters = [];

//       switch (filterType) {
//         case 'grayscale':
//           fabricImage.filters.push(new fabric.Image.filters.Grayscale());
//           break;
//         case 'blur':
//           fabricImage.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 }));
//           break;
//         case 'invert':
//           fabricImage.filters.push(new fabric.Image.filters.Invert());
//           break;
//         case 'sharpen':
//           fabricImage.filters.push(new fabric.Image.filters.Sharpen());
//           break;
//         case 'edge':
//           fabricImage.filters.push(new fabric.Image.filters.EdgeEnhance());
//           break;
//         default:
//           break;
//       }

//       fabricImage.applyFilters();
//       fabricRef.current.renderAll();
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('http://localhost:8080/api/images/upload', {
//         method: 'POST',
//         body: formData
//       });

//       const result = await response.json();
//       console.log(result.message);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Image Filter App</h1>
//         <input type="file" onChange={handleFileUpload} />
//         <div className="button-row">
//           <button onClick={() => setSelectedFilter('grayscale')}>Grayscale</button>
//           <button onClick={() => setSelectedFilter('blur')}>Blur</button>
//           <button onClick={() => setSelectedFilter('invert')}>Invert Colors</button>
//           <button onClick={() => setSelectedFilter('sharpen')}>Sharpen</button>
//           <button onClick={() => setSelectedFilter('edge')}>Edge Detection</button>
//         </div>
//         <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #ddd' }} />
//       </header>
//     </div>
//   );
// }

// export default App;




// import React, { useRef, useEffect, useState } from 'react';
// import './App.css';
// import * as fabric from 'fabric';
// import carImage from './image/car2.jpg';
// function App() {
//   const canvasRef = useRef(null);
//   const fabricRef = useRef(null);
//   const [selectedFilter, setSelectedFilter] = useState(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       fabricRef.current = new fabric.Canvas(canvasRef.current);
//       fabric.Image.fromURL(carImage, (img) => {
//         img.set({
//           left: 0,
//           top: 0,
//           scaleX: canvasRef.current.width / img.width,
//           scaleY: canvasRef.current.height / img.height
//         });
//         fabricRef.current.add(img);
//         fabricRef.current.renderAll();
//       }, { crossOrigin: 'Anonymous' });

//       return () => {
//         if (fabricRef.current) {
//           fabricRef.current.dispose();
//         }
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedFilter) {
//       applyFilter(selectedFilter);
//     }
//   }, [selectedFilter]);

//   const applyFilter = async (filterType) => {
//     if (!fabricRef.current) return;

//     const objects = fabricRef.current.getObjects();
//     if (objects.length > 0) {
//       const fabricImage = objects[0];
//       fabricImage.filters = [];

//       switch (filterType) {
//         case 'grayscale':
//           fabricImage.filters.push(new fabric.Image.filters.Grayscale());
//           break;
//         case 'blur':
//           fabricImage.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 }));
//           break;
//         case 'invert':
//           fabricImage.filters.push(new fabric.Image.filters.Invert());
//           break;
//         case 'sharpen':
//           fabricImage.filters.push(new fabric.Image.filters.Sharpen());
//           break;
//         case 'edge':
//           fabricImage.filters.push(new fabric.Image.filters.EdgeEnhance());
//           break;
//         default:
//           break;
//       }

//       fabricImage.applyFilters();
//       fabricRef.current.renderAll();
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/images/upload', {
//         method: 'POST',
//       });

//       const text = await response.text(); 
//       console.log('Response Text:', text); 

//       if (response.ok) {
//         const result = JSON.parse(text); 
//         console.log(result.message);
//       } else {
//         console.error('Upload failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error applying filter:', error);
//     }
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const response = await fetch('/api/images/upload', {
//         method: 'POST',
//         body: formData
//       });

//       const text = await response.text(); 
//       console.log('Response Text:', text); 

//       if (response.ok) {
//         const result = JSON.parse(text); 
//         console.log(result.message);
//         console.log('Uploaded file name:', result.fileName);
//       } else {
//         console.error('Upload failed:', response.statusText);
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Image Filter App</h1>
//         <input type="file" onChange={handleFileUpload} />
//         <div className="button-row">
//           <button onClick={() => setSelectedFilter('grayscale')}>Grayscale</button>
//           <button onClick={() => setSelectedFilter('blur')}>Blur</button>
//           <button onClick={() => setSelectedFilter('invert')}>Invert Colors</button>
//           <button onClick={() => setSelectedFilter('sharpen')}>Sharpen</button>
//           <button onClick={() => setSelectedFilter('edge')}>Edge Detection</button>
//         </div>
//         <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #ddd' }} />
//       </header>
//     </div>
//   );
// }

// export default App;



// import React, { useRef, useEffect, useState } from 'react';
// import './App.css';
// import * as fabric from 'fabric';
// import carImage from './image/car2.jpg';

// function App() {
//   const canvasRef = useRef(null);
//   const fabricRef = useRef(null);
//   const [selectedFilter, setSelectedFilter] = useState(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       fabricRef.current = new fabric.Canvas(canvasRef.current);
//       fabric.Image.fromURL(carImage, (img) => {
//         img.set({
//           left: 0,
//           top: 0,
//           scaleX: canvasRef.current.width / img.width,
//           scaleY: canvasRef.current.height / img.height
//         });
//         fabricRef.current.add(img);
//         fabricRef.current.renderAll();
//       }, { crossOrigin: 'Anonymous' });

//       return () => {
//         if (fabricRef.current) {
//           fabricRef.current.dispose();
//         }
//       };
//     }
//   }, []);

//   useEffect(() => {
//     if (selectedFilter) {
//       applyFilter(selectedFilter);
//     }
//   }, [selectedFilter]);

//   const applyFilter = async (filterType) => {
//     if (!fabricRef.current) return;

//     const objects = fabricRef.current.getObjects();
//     if (objects.length > 0) {
//       const fabricImage = objects[0];
//       fabricImage.filters = [];

//       switch (filterType) {
//         case 'grayscale':
//           fabricImage.filters.push(new fabric.Image.filters.Grayscale());
//           break;
//         case 'blur':
//           fabricImage.filters.push(new fabric.Image.filters.Blur({ blur: 0.5 }));
//           break;
//         case 'invert':
//           fabricImage.filters.push(new fabric.Image.filters.Invert());
//           break;
//         case 'sharpen':
//           fabricImage.filters.push(new fabric.Image.filters.Sharpen());
//           break;
//         case 'edge':
//           fabricImage.filters.push(new fabric.Image.filters.EdgeEnhance());
//           break;
//         default:
//           break;
//       }

//       fabricImage.applyFilters();
//       fabricRef.current.renderAll();
//     }
//     const response = await fetch('http://localhost:8080/api/images/upload', {
//       method: 'POST',
//   });
//     const result = await response.json();
//     console.log(result.message);
//   };

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//         const response = await fetch('http://localhost:8080/api/images/upload', { // Update to the correct port
//             method: 'POST',
//             body: formData
//         });

//         const text = await response.text(); // Get raw text response
//         console.log('Response Text:', text); // Log the raw text

//         if (response.ok) {
//             const result = JSON.parse(text); // Manually parse JSON
//             console.log(result.message);
//             console.log('Uploaded file name:', result.fileName);
//         } else {
//             console.error('Upload failed:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error uploading file:', error);
//     }
// };

//   //   try {
//   //     const response = await fetch('/api/images/upload', {
//   //         method: 'POST',
//   //         body: formData
//   //     });

//   //     if (response.ok) {
//   //         const result = await response.json();
//   //         console.log(result.message);
//   //         console.log('Uploaded file name:', result.fileName);
//   //         const imgUrl = `/path/to/uploads/${result.fileName}`; 
//   //         fabric.Image.fromURL(imgUrl, (img) => {
//   //             if (fabricRef.current) {
//   //                 fabricRef.current.clear();
//   //                 img.set({
//   //                     left: 0,
//   //                     top: 0,
//   //                     scaleX: canvasRef.current.width / img.width,
//   //                     scaleY: canvasRef.current.height / img.height
//   //                 });
//   //                 fabricRef.current.add(img);
//   //                 fabricRef.current.renderAll();
//   //             }
//   //         }, { crossOrigin: 'Anonymous' });
//   //     } else {
//   //         console.error('Upload failed:', response.statusText);
//   //     }
//   // } catch (error) {
//   //     console.error('Error uploading file:', error);
//   // }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Image Filter App</h1>
//         <input type="file" onChange={handleFileUpload} />
//         <div className="button-row">
//           <button onClick={() => setSelectedFilter('grayscale')}>Grayscale</button>
//           <button onClick={() => setSelectedFilter('blur')}>Blur</button>
//           <button onClick={() => setSelectedFilter('invert')}>Invert Colors</button>
//           <button onClick={() => setSelectedFilter('sharpen')}>Sharpen</button>
//           <button onClick={() => setSelectedFilter('edge')}>Edge Detection</button>
//         </div>
//         <canvas ref={canvasRef} width={800} height={600} style={{ border: '1px solid #ddd' }} />
//       </header>
//     </div>
//   );
// }

// export default App;



// import React, { useRef, useEffect } from 'react';
// import './App.css';
// import * as fabric from 'fabric';
// import carImage from './image/car2.jpg';

// function App() {
//   const canvasRef = useRef(null);
//   const fabricRef = useRef(null);

//   useEffect(() => {
//     if (canvasRef.current) {
//       console.error('Canvas reference is not set.');
//       fabricRef.current = new fabric.Canvas(canvasRef.current);
//       fabric.Image.fromURL(carImage, (img) => {
//         // console.log(`Image width: ${img.width}, height: ${img.height}`);
//         // console.log(`Canvas width: ${canvasRef.current.width}, height: ${canvasRef.current.height}`);
//         img.set({
//           left: 0,
//           top: 0,
//           scaleX: canvasRef.current.width / img.width,
//           scaleY: canvasRef.current.height / img.height
//         });
//         fabricRef.current.add(img);
//         fabricRef.current.renderAll();
//       }, { crossOrigin: 'Anonymous' });

//       return () => {
//         if (fabricRef.current) {
//           fabricRef.current.dispose();
//         }
//       };
//     }
//   }, []);
