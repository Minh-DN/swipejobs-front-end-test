import React from 'react'
import './JobCard.css';
import { FaCalendarAlt } from 'react-icons/fa';
import { ImLocation } from 'react-icons/im';
import { GoTools } from 'react-icons/go';
import { BsPersonCircle } from 'react-icons/bs';
import * as helper from '../ultilities/JobCardHelper';

function JobCard(props) {

  const {
    jobId,
    jobTitle,
    company,
    wagePerHourInCents,
    milesToTravel,
    shifts,
    requirements
  } = props.job

  const milesRounded = milesToTravel.toFixed(1);
  const wageInDollar = (wagePerHourInCents / 100).toFixed(2);

  const handleAcceptJob = props.onAccept;
  const handleDeclineJob = props.onDecline;

  return (
    <div className='job-card' data-testid={`JOB-ID-${jobId}__CARD`}>
      <img 
        src={jobTitle.imageUrl} 
        alt="Job Preview Image"
        data-testid={`JOB-ID-${jobId}__IMAGE`}
      />

      <div className='job-card__job-title' data-testid={`JOB-ID-${jobId}__TITLE-CONTAINER`}>
        <span 
          className='job-title__job-name'
          data-testid={`JOB-ID-${jobId}__JOB-TITLE`}
        >
          {jobTitle.name}
        </span>
        <br />
        <span 
          className='job-title__company-name'
          data-testid={`JOB-ID-${jobId}__COMPANY-NAME`}
        >
          {company.name}</span>
      </div>

      <div className='job-card__key-info' data-testid={`JOB-ID-${jobId}__KEY-INFO-CONTAINER`}>
        <div className="key-info__distance" data-testid={`JOB-ID-${jobId}__KEY-INFO-DISTANCE`}>
          <span 
            className='key-info__text'
            data-testid={`JOB-ID-${jobId}__KEY-INFO-DISTANCE-HEADER`}
          >
            Distance
          </span>
          <br />
          <span 
            className='key-info__value'
            data-testid={`JOB-ID-${jobId}__KEY-INFO-DISTANCE-VALUE`}
          >
            {milesRounded} miles
          </span>
        </div>

        <div className="key-info__rate" data-testid={`JOB-ID-${jobId}__KEY-INFO-HOURLY-RATE-CONTAINER`}>
          <span 
            className='key-info__text'
            data-testid={`JOB-ID-${jobId}__KEY-INFO-HOURLY-RATE-HEADER`}
          >
            Hourly Rate
          </span>
          <br />
          <span 
            className='key-info__dollar-sign'
            data-testid={`JOB-ID-${jobId}__KEY-INFO-HOURLY-RATE-DOLLAR-SIGN`}
          >
            $
          </span>
          <span 
            className='key-info__value'
            data-testid={`JOB-ID-${jobId}__KEY-INFO-HOURLY-RATE-VALUE`}
          >
            {wageInDollar}
          </span>
        </div>
      </div>

      <div className='job-card__shift-dates' data-testid={`JOB-ID-${jobId}__SHIFT-DATES-CONTAINER`}>
        <FaCalendarAlt className='job-card__icon' data-testid={`JOB-ID-${jobId}__CALENDAR-ICON`}/>
        <div className='shift-dates__text' data-testid={`JOB-ID-${jobId}__SHIFT-DATES-TEXT`}>
          <span 
            className='shift-dates__title'
            data-testid={`JOB-ID-${jobId}__SHIFT-DATES-TITLE`}
          >
            Shift Dates
          </span>
          <br />
          {shifts.map((shift, key) => {
						return (
							<React.Fragment key={key}>
								<span className='shift-dates__time' data-testid={`JOB-ID-${jobId}__SHIFT-NUMBER-${key+1}`}>
									{helper.getFormattedDate(shift)}
								</span>
								<br />
							</React.Fragment>
						)
					})}
        </div>
      </div>

      <hr />

      <div className='job-card__location' data-testid={`JOB-ID-${jobId}__LOCATION-CONTAINER`}>
        <ImLocation className='job-card__icon' data-testid={`JOB-ID-${jobId}__LOCATION-ICON`}/>
        <div className='location__text' data-testid={`JOB-ID-${jobId}__LOCATION-TEXT-CONTAINER`}>
          <span 
            className='location__title'
            data-testid={`JOB-ID-${jobId}__LOCATION-TITLE`}
          >
            Location
          </span>
          <br />
          <span 
            className='location__address'
            data-testid={`JOB-ID-${jobId}__LOCATION-ADDRESS`}
          >
            {company.address.formattedAddress}
          </span>
          <br />
          <span 
            className='location__distance'
            data-testid={`JOB-ID-${jobId}__LOCATION-DISTANCE`}
          >
            {milesRounded} miles from you job search location
          </span>
        </div>
      </div>

      <hr />

      <div className='job-card__requirements' data-testid={`JOB-ID-${jobId}__REQUIREMENTS-CONTAINER`}>
        <GoTools className='job-card__icon' data-testid={`JOB-ID-${jobId}__REQUIREMENTS-ICON`}/>
        <div className='requirements__text' data-testid={`JOB-ID-${jobId}__REQUIREMENTS-TEXT`}>
          <span 
            className='requirements__title'
            data-testid={`JOB-ID-${jobId}__REQUIREMENTS_TITLE`}
          >
            Requirements
          </span>
          <br />
          <ul>
            { requirements ? 
                requirements.map((item, key) => 
                  <li 
                    key={key}
                    data-testid={`JOB-ID-${jobId}__REQUIREMENT-NUMBER-${key+1}`}
                  >
                    - {item}
                  </li> 
                ) 
                : <i data-testid={`JOB-ID-${jobId}__NO-REQUIREMENTS-TEXT`}>No requirements</i>
            }
          </ul>
        </div>
      </div>

      <hr />

      <div className='job-card__report-to' data-testid={`JOB-ID-${jobId}__REPORT-TO-CONTAINER`}>
        <BsPersonCircle className='job-card__icon' data-testid={`JOB-ID-${jobId}__REPORT-TO-ICON`}/>
        <div className='report-to__text' data-testid={`JOB-ID-${jobId}__REPORT-TO-TEXT`}>
          <span 
            className='report-to__title'
            data-testid={`JOB-ID-${jobId}__REPORT-TO-TITLE`}
          >
            Report To
          </span>
          <br />
          <span 
            className='report-to__name'
            data-testid={`JOB-ID-${jobId}__REPORT-TO-NAME`}
          >
            {helper.getReportTo(company.reportTo)}
          </span>
        </div>
      </div>

      <div className='job-card__button-container' data-testid={`JOB-ID-${jobId}__BUTTON-CONTAINER`}>
				<button 
          className='job-card__decline-button' 
          onClick={handleDeclineJob}
          data-testid={`JOB-ID-${jobId}__DECLINE-BUTTON`}
        >
					No Thanks
				</button>
				<button 
          className='job-card__accept-button' 
          onClick={handleAcceptJob}
          data-testid={`JOB-ID-${jobId}__ACCEPT-BUTTON`}
        >
					I'll Take it
				</button>
      </div>

    </div>
  )
}

export default JobCard;
