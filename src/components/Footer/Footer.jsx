import React from "react";
import PropTypes from "prop-types";
import FooterDesktop from "./footerDesktop";
import FooterMobile from "./footerMobile";
Footer.propTypes = {};

function Footer(props) {
  return (
        <div>
             <FooterDesktop/>
            {/* <div className="hidden lg:block">
               
              
            </div>
             <div className="md:hidden">
                
                <FooterMobile/>
            </div> */}
            
        </div>
  );
}

export default Footer;
