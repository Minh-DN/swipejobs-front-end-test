import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import JobCard from './components/JobCard';
import JobResponseModal from './components/JobResponseModal';

const api = axios.create({
  baseURL: 'https://test.swipejobs.com/api/worker/7f90df6e-b832-44e2-b624-3143d428001f/'
})

export const JOB_MODAL_ACTION = {
  ACCEPT: 'accept',
  DECLINE: 'decline',
}

function App() {
  const [ worker, setWorker ] = useState({}); 
  const [ jobMatches, setJobMatches ] = useState([]);
  const [ jobResponse, setJobResponse ] = useState({});
  const [ jobModal, setJobModal ] = useState({
    isOpen: false,
    jobId: '',
    action: '',
    confirmed: false           
  });
  
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const profile = await api.get('/profile');
    const matches = await api.get('/matches');
    setWorker(profile.data);
    setJobMatches(matches.data);
  }
  
  function handleRequestConfirm(jobId, action) {
    setJobModal({
      isOpen: true,
      jobId: jobId,
      action: action,
      confirmed: false,
    })
  }

  function handleConfirmChoice() {
    jobModal.action === JOB_MODAL_ACTION.ACCEPT ? 
      handleAcceptJob(jobModal.jobId)
      : handleDeclineJob(jobModal.jobId);
  }

  async function handleAcceptJob(jobId) {
    const response = await api.get(`/job/${jobId}/accept`);
    setJobResponse(response.data);

    const newJobMatches = jobMatches.filter(job => job.jobId !== jobId);
    setJobMatches(newJobMatches);
    
    setJobModal({ 
      isOpen: true, 
      jobId: jobId, 
      action: JOB_MODAL_ACTION.ACCEPT,
      confirmed: true
    });
  }

  async function handleDeclineJob(jobId) {
    const response = await api.get(`/job/${jobId}/reject`);
    setJobResponse(response.data);

    const newJobMatches = jobMatches.filter(job => job.jobId !== jobId);
    setJobMatches(newJobMatches);

    setJobModal({ 
      isOpen: true, 
      jobId: jobId, 
      action: JOB_MODAL_ACTION.DECLINE,
      confirmed: true
    });
  }

  function handleJobModalClose() {
    setJobModal({
      isOpen: false,
      jobId: '',
      action: '',
      confirmed: false
    });
  }


  return (
    <div className="app" data-testid="APP-CONTAINER">
      <header className="app-header" data-testid="APP-CONTAINER-HEADER">
        <Header worker={worker}/>
      </header>

      <div className="app-job-list" data-testid="APP-CONTAINER-JOB-LIST-CONTAINER">
        {jobMatches.map((job) => 
          <JobCard 
            key={job.jobId} 
            job={job} 
            onAccept={()=>{ handleRequestConfirm(job.jobId, JOB_MODAL_ACTION.ACCEPT) }}
            onDecline={()=>{ handleRequestConfirm(job.jobId, JOB_MODAL_ACTION.DECLINE) }}
          />
        )}

        { !jobMatches.length && 
          <span
            className='app-job-list__no-matches-header'
            data-testid="APP-JOB-LIST__NO-MATCHES-HEADER"
          >
            No Matches
          </span>
        }
      </div>

      { jobModal.isOpen && 
        <JobResponseModal 
          modalIsOpen={jobModal.isOpen}
          action={jobModal.action}
          confirmed={jobModal.confirmed}
          success={jobResponse.success}
          message={jobResponse.message}
          onConfirm={handleConfirmChoice}
          onClose={handleJobModalClose}
        />  
      }
    </div>
  );
}

export default App;
