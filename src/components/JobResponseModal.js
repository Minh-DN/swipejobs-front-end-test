import React from 'react';
import ReactDOM from 'react-dom';
import './JobResponseModal.css';
import { IoClose } from 'react-icons/io5';
import { JOB_MODAL_ACTION } from '../App';

function JobResponseModal(props) {

  const {
    modalIsOpen,
    action,
    confirmed,
    success,
    message,
    onConfirm,
    onClose
  } = props;

  if (!modalIsOpen) return null;

  return ReactDOM.createPortal(
    <div className='job-response-modal__overlay' data-testid="JOB-RESPONSE-MODAL__OVERLAY">
      <div 
        className='job-response-modal'
        data-testid="JOB-REPONSE-MODAL"
      >
        <IoClose
          className='job-response-modal__close-icon'
          onClick={onClose}
          data-testid="JOB-REPONSE-MODAL__CLOSE-ICON"
        />

        { !confirmed && action === JOB_MODAL_ACTION.DECLINE &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__CONFIRM-DECLINE"
          >
            <span
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-DECLINE-HEADER"
            >
              Are you sure you want to decline this job?
            </span>
            <br />
            <button
              onClick={onConfirm}
              className='job-response-modal__confirm-decline'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-DECLINE-YES-BUTTON"
            >
              Yes
            </button>

            <button 
              onClick={onClose}
              className='job-response-modal__reject-decline'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-DECLINE-NO-BUTTON"
            >
              No
            </button>
          </div>
        } 

        { !confirmed && action === JOB_MODAL_ACTION.ACCEPT &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__CONFIRM-ACCEPT"
          >
            <span
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-ACCEPT-HEADER"
            >
              Please confirm application
            </span>
            <br />
            <button
              onClick={onConfirm}
              className='job-reponse-modal__confirm-accept'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-ACCEPT-YES-BUTTON"
            >
              Confirm
            </button>

            <button 
              onClick={onClose}
              className='job-reponse-modal__go-back'
              data-testid="JOB-RESPONSE-MODAL__CONFIRM-ACCEPT-NO-BUTTON"
            >
              Go Back
            </button>
          </div>
        }

        { confirmed && action === JOB_MODAL_ACTION.ACCEPT && success &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__ACCEPT-SUCCESS"
          >
            <span
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__ACCEPTED-HEADER"
              style={{ color: '#30D4AB' }}
            >
              Job Accepted!
            </span>
          </div>
        }

        { confirmed && action === JOB_MODAL_ACTION.DECLINE && success &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__DECLINE-SUCCESS"
          >
            <span 
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__DECLINE-HEADER"
            >
              Job Declined
            </span>
          </div>
        }

        { confirmed && action === JOB_MODAL_ACTION.ACCEPT && !success  &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__ACCEPT-FAILED"
          >
            <span
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__ACCEPT-FAILED-HEADER"
            >
              {message}
            </span>
          </div>
        }

        { confirmed && action === JOB_MODAL_ACTION.DECLINE && !success &&
          <div
            className='job-reponse-modal__message'
            data-testid="JOB-RESPONSE-MODAL__DECLINE-FAILED"
          >
            <span 
              className='job-reponse-modal__header'
              data-testid="JOB-RESPONSE-MODAL__DECLINE-FAILED-HEADER"
            >
              {message} 
            </span>
            <br />
            <span
              className='job-reponse-modal__decline-failed-text'
              data-testid="JOB-RESPONSE-MODAL__DECLINE-FAILED-TEXT"
            >
              This job has been removed from your matches list
            </span>
          </div>
        }
      </div>
    </div>
    ,
    document.getElementById('portal')
  )
}

export default JobResponseModal;
