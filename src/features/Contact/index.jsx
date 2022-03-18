import React from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

Contact.propTypes = {};

function Contact(props) {
  const center = {
    lat: 59.95,
    lng: 30.33,
  };
  const zoom = 11;
  return (
    <div>
      <section className="py-1 bg-blueGray-50">
                    <div className="w-full mb-12 xl:mb-0 px-4 mx-auto mt-4">
                      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                        <div className="rounded-t mb-0 px-4 py-3 border-0 flex-row lg:flex lg:flex-col-2">
                          <div className="rounded-t mb-0 px-6 py-4 border-0 m-6 lg:w-1/2">
                            <p className="text-2xl lg:text-4xl py-4">Information</p>
                            <div className="text-base lg:text-xl space-y-3">
                              <p>
                              <span className="ml-0 underline">Tên đề tài:</span><span className="italic ">Đề tài xây dựng website bán đồ ăn nhanh trên nền tảng Nodejs(express) và SQl Server </span>
                              </p>
                              
                              <p>Người viết:</p>
                              <ul>
                                <li>Bùi Doãn Hưng</li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center lg:w-1/2">
                            <div className="relative w-full max-w-full flex-grow flex-1">
                              <h3 className="font-semibold text-base text-blueGray-700">
                                <div style={{ height: "80vh", width: "100%" }}>
                                  <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14890.731957720101!2d105.70353978612658!3d21.085319996549597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455c70a56c4e9%3A0xb794570100f480c8!2zVMOibiBM4bqtcCwgxJBhbiBQaMaw4bujbmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1637030285923!5m2!1svi!2s"
                                    width="600"
                                    height="450"
                                    style={{ height: "80vh", width: "100%", padding: "50px", display: 'block' }}
                                    loading="lazy"
                                  ></iframe>
                                </div>
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
      </section>
      
    </div>
  );
}

export default Contact;
