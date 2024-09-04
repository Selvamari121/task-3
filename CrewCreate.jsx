
import React, { useState } from 'react';
function CrewCreate(){
   const [Crid, setCrid] = useState('');
   const [RoleId, setRoleid] = useState('');
   const [Name, setName] = useState('');
   const [Email, setEmail] = useState('');
   const [Mobile, setMobile] = useState('');
   const [PAN, setPan] = useState(false);
   const [errorMessage, setErrorMessage] = useState(''); 
 
   const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage(''); 
 
      const crew = {
         Crid,
         RoleId,
         Name,
         Email,
         Mobile,
         PAN
      };
 
      try {
         const response = await fetch('http://localhost:8080/crew/create', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(crew)
         });
 
         if (response.ok) {
            alert('Payment crew created successfully');
         } else {
            const errorText = await response.text();
            setErrorMessage(errorText || 'Failed to create crew');
         }
      } catch (error) {
         console.error('Error:', error);
         setErrorMessage('An error occurred');
      }
   };

   return (
      <div className="container">
         <h1>Crew Create</h1>
         <form id="form" onSubmit={handleSubmit}>
         <div className="input-group">
               <label htmlFor="crid">Crew : </label>
               <input type="text" id="crid"  name="crid"  placeholder="Enter Crew"  value={Crid}  onChange={(e) => setCrid(e.target.value)} />
            </div>
         <div className="input-group">
               <label htmlFor="roleid">RoleID : </label>
               <input type="text" id="roleid"  name="roleid"  placeholder="Enter Role ID"  value={RoleId}  onChange={(e) => setRoleid(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="name">Total Amount : </label>
                  <input  type="text"  id="name" name="name"  placeholder="Enter a Name"  value={Name}  onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="email">Email : </label>
               <input type="text"  id="email"  name="email"  placeholder="Enter a Email"  value={Email}  onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="mobile">Mobile : </label>
               <input type="text" id="mobile" name="mobile" laceholder="Enter a Mobile" value={Mobile} onChange={(e) => setMobile(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="pan">PAN : </label>
               <input type="text" id="pan" name="pan" laceholder="Enter a PAN" value={PAN} onChange={(e) => setPan(e.target.checked)} />
            </div>
            <button type="submit">Save</button>
               {/* <Link to="/view"><button type="button">View</button></Link> */}
            {errorMessage && (
               <div className="error-message">{errorMessage}</div>
            )}
         </form>    
      </div>
   );
}
export default CrewCreate;