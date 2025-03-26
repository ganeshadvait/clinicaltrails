import './lstyles.css';
import GoesOutComesInUnderline from '../GoesOutComesInUnderline'
export default function Location () {
    return(
        <>
        <section className="location_box">
        <div className='flex items-center inner_boxes'>
            <div className="left_content">
                <div>
                    <span className='location_icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
  <path fillRule="evenodd" clipRule="evenodd" d="M14.0775 27.6675C14.0775 27.6675 5 20.0225 5 12.5C5 9.84784 6.05357 7.3043 7.92893 5.42893C9.8043 3.55357 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.55357 22.0711 5.42893C23.9464 7.3043 25 9.84784 25 12.5C25 20.0225 15.9225 27.6675 15.9225 27.6675C15.4175 28.1325 14.5863 28.1275 14.0775 27.6675ZM15 16.875C15.5745 16.875 16.1434 16.7618 16.6742 16.542C17.205 16.3221 17.6873 15.9998 18.0936 15.5936C18.4998 15.1873 18.8221 14.705 19.042 14.1742C19.2618 13.6434 19.375 13.0745 19.375 12.5C19.375 11.9255 19.2618 11.3566 19.042 10.8258C18.8221 10.295 18.4998 9.81266 18.0936 9.40641C17.6873 9.00015 17.205 8.67789 16.6742 8.45803C16.1434 8.23816 15.5745 8.125 15 8.125C13.8397 8.125 12.7269 8.58594 11.9064 9.40641C11.0859 10.2269 10.625 11.3397 10.625 12.5C10.625 13.6603 11.0859 14.7731 11.9064 15.5936C12.7269 16.4141 13.8397 16.875 15 16.875Z" fill="white"/>
</svg>
                    </span>
                    <h3 className='location_hthree'>Discover Clinical Trials Happening Near You</h3>
                    <p className='location_para'>Get real-time updates on clinical research and opportunities in your location.</p>
                    <a className='links_trail'>
                    <GoesOutComesInUnderline label="Explore trial now" />
                        </a>
                </div>
            </div>
            <div className="content_right">
                <img src='/world.svg' />
            </div>
        </div>
        </section>
        </>
    )
}