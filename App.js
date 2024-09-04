import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CrewCreate from './CrewCreate';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/crew" element={<CrewCreate />} />  
                {/* crewcreate <Route path="/view" element={<ViewAllSchedule />} />
                <Route path="/create/:schedule_id" element={<ScheduleCreate />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
