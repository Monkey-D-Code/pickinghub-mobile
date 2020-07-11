import React from 'react';


const Refresh = () => {
    return(
        <div className="refresh-page-btn">
            <button onClick={()=>window.location.reload(false)}><i className="fa fa-refresh" aria-hidden="true"></i></button>
        </div>
    );
    
}

export default Refresh;