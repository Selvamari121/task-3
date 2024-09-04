import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function ViewAllSchedule(){
   const [schedules, setSchedules] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const navigate = useNavigate();
   

   useEffect(() => {
      const fetchSchedules = async () => {
         try {
            const response = await axios.get('http://localhost:8080/schedule/view/all');
            setSchedules(response.data);
         } catch (err) {
            setError(err);
         } finally {
            setLoading(false);
         }
      };

      fetchSchedules();
   }, []);
   const onDelete = async (schedule_id) => {
      try {

         await axios.delete(`http://localhost:8080/schedule/delete/${schedule_id}`);
         setSchedules(schedules.filter(schedule => schedule.schedule_id !== schedule_id));
      } catch (err) {
         console.error('Error deleting schedule:', err);
      }
   };

   const onEdit = (schedule_id) => {
      navigate(`/create/${schedule_id}`);
   }   

   if (loading) return <p>Loading...</p>;
   if (error) return <p>Error fetching schedules: {error.message}</p>;

   return(
      <div>
         <h1>All Schedules</h1>
         <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
               <tr>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Total Amount</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Schedule Amount</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Payment Due Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Is Paid</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Payment Date</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {schedules.map(schedule => (
                  <tr key={schedule.schedule_id}>
                     <td style={{ border: '1px solid black', padding: '8px' }}>{schedule.total_amount}</td>
                     <td style={{ border: '1px solid black', padding: '8px' }}>{schedule.schedule_amount}</td>
                     <td style={{ border: '1px solid black', padding: '8px' }}>{schedule.payment_due_date}</td>
                     <td style={{ border: '1px solid black', padding: '8px' }}>{schedule.is_paid ? 'Yes' : 'No'}</td>
                     <td style={{ border: '1px solid black', padding: '8px' }}>{schedule.payment_date}</td>
                     <td style={{ border: '1px solid black', padding: '8px' }}>
                        <button onClick={() => onEdit(schedule.schedule_id, schedule)} style={{ marginRight: '8px' }}>
                           <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => onDelete(schedule.schedule_id)}>
                           <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default ViewAllSchedule;