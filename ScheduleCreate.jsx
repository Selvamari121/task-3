import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ScheduleCreate() {
   const { schedule_id } = useParams();
   const [project_id, setProjectId] = useState('');
   const [total_amount, setTotalAmount] = useState('');
   const [schedule_amount, setScheduleAmount] = useState('');
   const [payment_due_date, setPaymentDueDate] = useState('');
   const [is_paid, setIsPaid] = useState(false);
   const [payment_date, setPaymentDate] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [schedules, setSchedules] = useState([]);

   useEffect(() => {
      if (schedule_id) {
         fetch(`http://localhost:8080/schedule/view/${schedule_id}`)
            .then(response => response.json())
            .then(data => {
               setProjectId(data.project_id || '');
               setTotalAmount(data.total_amount || '');
               setScheduleAmount(data.schedule_amount || '');
               setPaymentDueDate(data.payment_due_date || '');
               setIsPaid(data.is_paid || false);
               setPaymentDate(data.payment_date || '');
               })
               .catch(error => console.error('Error fetching data:', error));
      }
   }, [schedule_id]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage('');

      const schedule = {
         project_id,
         total_amount,
         schedule_amount,
         payment_due_date, 
         is_paid,
         payment_date, 
      };
      try {
         if (schedule_id) {
            const response = await fetch(`http://localhost:8080/schedule/edit/${schedule_id}`, {
               method: 'PUT',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(schedule)
            });
     
            if (response.ok) {
               alert('Payment schedule updated successfully');
               setSchedules(schedules.map(s => s.id === schedule_id ? { ...s, ...schedule } : s));

            } else {
               const errorText = await response.text();
               setErrorMessage(errorText || 'Failed to update payment schedule');
            }
         } else {
            const response = await fetch('http://localhost:8080/schedule/create', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(schedule)
            });
     
            if (response.ok) {
               alert('Payment schedule created successfully');
               const newSchedule = await response.json();
               setSchedules([...schedules, newSchedule]);
            } else {
               const errorText = await response.text();
               setErrorMessage(errorText || 'Failed to create payment schedule');
            }
            setProjectId('');
            setTotalAmount('');
            setScheduleAmount('');
            setPaymentDueDate('');
            setIsPaid(false);
            setPaymentDate('');
         }
         setProjectId('');
         setTotalAmount('');
         setScheduleAmount('');
         setPaymentDueDate('');
         setIsPaid(false);
         setPaymentDate('');
     
      } catch (error) {
         console.error('Error:', error);
      }
   };
       
   return (
      <div className="container">
         <h1>{schedule_id ? 'Edit Payment Schedule' : 'Create Payment Schedule'}</h1>
         <form id="form" onSubmit={handleSubmit}>
            <div className="input-group">
               <label htmlFor="project_id">Project ID</label>
               <input type="text" id="project_id"  name="project_id"  placeholder="Enter Project ID"  value={project_id}  onChange={(e) => setProjectId(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="total_amount">Total Amount</label>
                  <input  type="text"  id="total_amount" name="total_amount"  placeholder="Enter Total Amount"  value={total_amount}  onChange={(e) => setTotalAmount(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="schedule_amount">Schedule Amount</label>
               <input type="text"  id="schedule_amount"  name="schedule_amount"  placeholder="Enter Schedule Amount"  value={schedule_amount}  onChange={(e) => setScheduleAmount(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="payment_due_date">Payment Due Date</label>
               <input type="date" id="payment_due_date" name="payment_due_date" value={payment_due_date} onChange={(e) => setPaymentDueDate(e.target.value)} />
            </div>
            <div className="input-group">
               <label htmlFor="is_paid">Is Paid</label>
               <input type="checkbox" id="is_paid" name="is_paid" checked={is_paid} onChange={(e) => setIsPaid(e.target.checked)} />
            </div>
            <div className="input-group">
                  <label htmlFor="payment_date">Payment Date</label>
                  <input type="date" id="payment_date" name="payment_date" value={payment_date} onChange={(e) => setPaymentDate(e.target.value)} />
            </div>
            <button type="submit">{schedule_id ? 'Update' : 'Save'}</button>
               <Link to="/view"><button type="button">View</button></Link>
               {errorMessage && (
                  <div className="error-message">{errorMessage}</div>
               )}
         </form>
      </div>
   );
}

export default ScheduleCreate;
