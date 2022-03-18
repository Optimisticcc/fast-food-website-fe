import React from 'react'
import HeaderDesktop from'./index'
import HaederMobile from './HMobile/HeaderMobile'
function HeaderDefault() {
    return (
        <div>
            <div className="hidden lg:block">
                <HeaderDesktop/>
            </div>
            <div className="lg:hidden ">
                <HaederMobile/>
            </div>
            
        </div>
    )
}

export default HeaderDefault
