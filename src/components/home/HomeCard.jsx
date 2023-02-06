import '../../assets/scss/home.scss';
import {BiHomeCircle, BiTime} from "react-icons/bi";
import {TbBeach} from "react-icons/tb";
const HomeCard = (
    {
        title,
        isLarge,
        timeOff,
        onLeave,
        celebration,
        announcement
    }


) =>{

    return(
        <>
       <div className={isLarge ? 'home_large_card' : 'home_small_card'}>

           <div className="card_header">
               {title}
           </div>
           { timeOff && <>
           <div className="card_content">
               <div className="div">
                   <span className="card_icon"><BiHomeCircle /></span>
                   <h6>WFH</h6>
                   <p>4 Days used</p>
               </div>
               <div className="div">
                   <span className="card_icon"><TbBeach /></span>
                   <h6>ANNUAL LEAVE</h6>
                   <p>4 Days used</p>
               </div>
           </div>
           <button className="home_card_btn">
               <span><BiTime /></span>
               Request time off
           </button>
           </>
           }
           { onLeave &&
               <>
               <p style={{fontSize: '14px', marginLeft: '.7rem'}}>Now(6) peoples on leave</p>
               <div className="card_content leave_container">
                    {/*For testing purposes, will be removed soon*/}
                  <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
                   <div className="people_profile"></div>
               </div>
               </>
           }
           { celebration &&
               <>

                   <div className="card_content leave_container">
                       {/*For testing purposes, will be removed soon*/}
                       <div className="people_profile"></div>
                       <div className="people_profile"></div>
                       <div className="people_profile"></div>
                   </div>
               </>
           }
           {
               announcement && 'List crud'
           }

       </div>
        </>
    )
}

/* This will receive props such as
isLarge: Boolean
headerText: String,
icon: Boolean
btn: boolean
btnText: string
*/

export default HomeCard;