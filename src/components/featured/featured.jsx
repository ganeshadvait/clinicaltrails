import React from 'react';
import './fstyles.css';
// Define the data object outside the component to keep the component body clean
const trialsOne = {
    clinicalID: "NCT03655236",
    status: "Actively Recruiting",
    title: "PROSEEK: A Phase 2 Study In Early Parkinson's Disease Patients Evaluating The Safety And Efficacy Of Abl...",
    condition: "Parkinson's Disease",
    gender: "Male & Female",
    studyType: "Interventional",
    phase: "2",
    treatment: "K0706 Placebo",
    ageRange: "18–30",
    location: "Italy",
    startDate: "January 10, 2025",
    endDate: "May 16, 2025"
};

export default function Featured() {
    return (
        <>
        <section className='mb-3 need_hidden' >
          <h2 className=' text-2xl font-500 leading-tight mb-6 text-black sm:text-4xl lg:text-5xl text-center'>Featured Clinical Trials</h2>
        </section>
        <div className='boxesof_code ' >
            <div className="content_cards">
            <div className='blue_box'>
                <div className='parent_box'>
                    <div className='left_head'>
                        <p className='font_white text-white'>Clinical ID: {trialsOne.clinicalID}</p>
                        </div>
                    <div className='right_box'>
                        <div className='tickbox flex bg-white'><span className='color_green'>{trialsOne.status}</span>
                        <img src='/nrk_check-active.svg' />
                        </div>
                        </div>
                </div>
                <p className='trailcontent_title'>{trialsOne.title}</p>
            </div>
            <div className='white_box flex flex-col gap-2'>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Gender:</span>{trialsOne.gender}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Study Type:</span>{trialsOne.studyType}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Phase:</span>{trialsOne.phase}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Treatment:</span>{trialsOne.treatment}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Age:</span>{trialsOne.ageRange}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Location:</span>{trialsOne.location}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Started Date:</span>{trialsOne.startDate}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>End Date:</span>{trialsOne.endDate}</p>
                <p className='optionsin_card last_one'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <button className='knowmore_cta w-full h-[60px] bg-[]' style={{
                    borderRadius: '14px',
                    border: "1px solid #024DE5",
                    color:'white',
                    
                    background: "#024DE5"
                }}>Know more</button>
            </div>

            </div>
            <div className="content_cards">
            <div className='blue_box'>
                <div className='parent_box'>
                    <div className='left_head'>
                        <p className='font_white text-white'>Clinical ID: {trialsOne.clinicalID}</p>
                        </div>
                    <div className='right_box'>
                        <div className='tickbox flex bg-white'><span className='color_green'>{trialsOne.status}</span>
                        <img src='/nrk_check-active.svg' />
                        </div>
                        </div>
                </div>
                <p className='trailcontent_title'>{trialsOne.title}</p>
            </div>
            <div className='white_box flex flex-col gap-2'>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Gender:</span>{trialsOne.gender}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Study Type:</span>{trialsOne.studyType}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Phase:</span>{trialsOne.phase}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Treatment:</span>{trialsOne.treatment}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Age:</span>{trialsOne.ageRange}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Location:</span>{trialsOne.location}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Started Date:</span>{trialsOne.startDate}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>End Date:</span>{trialsOne.endDate}</p>
                <p className='optionsin_card last_one'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <button className='knowmore_cta w-full h-[60px] bg-[]' style={{
                    borderRadius: '14px',
                    border: "1px solid #024DE5",
                    color:'white',
                    
                    background: "#024DE5"
                }}>Know more</button>
            </div>
            </div>
            <div className="content_cards">
            <div className='blue_box'>
                <div className='parent_box'>
                    <div className='left_head'>
                        <p className='font_white text-white'>Clinical ID: {trialsOne.clinicalID}</p>
                        </div>
                    <div className='right_box'>
                        <div className='tickbox flex bg-white'><span className='color_green'>{trialsOne.status}</span>
                        <img src='/nrk_check-active.svg' />
                        </div>
                        </div>
                </div>
                <p className='trailcontent_title'>{trialsOne.title}</p>
            </div>
            <div className='white_box flex flex-col gap-2'>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Gender:</span>{trialsOne.gender}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Study Type:</span>{trialsOne.studyType}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Phase:</span>{trialsOne.phase}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Treatment:</span>{trialsOne.treatment}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Age:</span>{trialsOne.ageRange}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Location:</span>{trialsOne.location}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>Started Date:</span>{trialsOne.startDate}</p>
                <p className='optionsin_card'><span className='font-[500]  condition_topic'>End Date:</span>{trialsOne.endDate}</p>
                <p className='optionsin_card last_one'><span className='font-[500]  condition_topic'>Condition:</span>{trialsOne.condition}</p>
                <button className='knowmore_cta w-full h-[60px] bg-[]' style={{
                    borderRadius: '14px',
                    border: "1px solid #024DE5",
                    color:'white',
                    
                    background: "#024DE5"
                }}>Know more</button>
            </div>
            </div>
        </div>
        </>
        
    );
}
