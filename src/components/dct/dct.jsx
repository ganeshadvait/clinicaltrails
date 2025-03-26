import './dstyles.css';
import GoesOutComesInUnderline from '../GoesOutComesInUnderline'
export default function DCT () {
    return (
        <>
        <section className="dct">
             <div className='flex items-center inner_dct'>
                <div className="dct_left">
                    <div className="flex flex-col gap-3">
                        <h2 className='left_heading'>
                        Accelerating <span className='color_blue'> Clinical Research</span> with <br></br>Trusted <span className='color_blue'> DCT </span> Solutions
                        </h2>
                        <p className='left_para'>Decentrialz Clinical Trials (DCTs) are a modern approach to clinical research that uses digital tools and remote methods to conduct trials outside traditional clinical sites. By enabling virtual visits, remote monitoring, and digital data collection, DCTs improve patient convenience, enhance recruitment diversity, and reduce trial costs. DCTs empower both researchers and participants by making clinical trials more accessible, efficient, and patient-friendly.</p>
                        <a className="decoration_line">
                        <GoesOutComesInUnderline label="Our Mission & Vision →" />
                            </a>
                    </div>
                </div>
                <div className="dct_right">
                    <img src='/Group 39475.png' />
                </div>
             </div>
        </section>
        </>
    )
}