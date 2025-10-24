import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../assets/styles/Cars.scss";
import { getToursData, getVehicleData } from "../api";
import { useQuery } from "@tanstack/react-query";
import { translations } from "../translations";

export default function Cars() {
  const { t, lang } = useLanguage();
  const {
    data: vehiclesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["vehicles", lang],
    queryFn: () => getVehicleData(lang),
  });
  const vehicles = Array.isArray(vehiclesData)
    ? vehiclesData
    : Array.isArray(vehiclesData?.data)
      ? vehiclesData.data
      : [];

  if (isLoading) {
    return <div>{t("common.loading", "Loading...")}</div>;
  }

  return (
    <>
      <section className="cars_section">
        <div className="triangle_decor triangle_decor_top">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="55"
            viewBox="0 0 1920 55"
            fill="none"
          >
            <path d="M1920 0.654785L0 54.3096V0.654785H1920Z" fill="white" />
          </svg>
        </div>
        <div className="container">
          <div className="row">
            <div className="inner_cars_section">
              <div className="text_details">
                <div className="line_decor">
                  <span></span>
                </div>
                <h6 className="subtitle"
                  data-aos="flip-up"
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos-mirror="true"
                >{t("cars.subtitle")}</h6>
                <h5 className="text_details_section_title"
                  data-aos="flip-up"
                  data-aos-delay="300"
                  data-aos-duration="800"
                  data-aos-mirror="true">
                  {t("cars.title")}
                </h5>
              </div>
              <div className="cars_wrapper">
                <div className="car_wrapper_items">
                  {/* car item */}
                  {/* car item */}
                  {vehicles.map((vehicle, index) => (

                    <div className="car_item"
                      key={index}
                      data-aos="slide-up"
                      data-aos-delay="200"
                      data-aos-duration="600"
                      data-aos-mirror="true">
                      <div className="wrapper">
                        <div className="left_details">
                          <div className="top">
                            <h2>{vehicle.title}</h2>
                            <div className="details">
                              <div className="detail_item">
                                <div className="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="35"
                                    height="33"
                                    viewBox="0 0 35 33"
                                    fill="none"
                                  >
                                    <path
                                      d="M17.2321 0C9.50377 0 3.23657 6.04317 3.23657 13.4956C3.23657 21.0651 9.35958 26.2392 17.2321 33C25.1046 26.2392 31.2276 21.0649 31.2276 13.4956C31.2276 6.04298 24.9604 0 17.2321 0ZM17.2321 24.75C11.0474 24.75 6.03568 19.8247 6.03568 13.75C6.03568 7.67531 11.0476 2.75 17.2321 2.75C23.4168 2.75 28.4285 7.67531 28.4285 13.75C28.4285 19.8247 23.4168 24.75 17.2321 24.75Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M15.0687 10.6554C15.0687 11.1129 14.8836 11.5517 14.5543 11.8753C14.225 12.1988 13.7784 12.3806 13.3126 12.3806C12.8469 12.3806 12.4003 12.1988 12.071 11.8753C11.7416 11.5517 11.5566 11.1129 11.5566 10.6554C11.5566 10.1978 11.7416 9.75901 12.071 9.43548C12.4003 9.11194 12.8469 8.93018 13.3126 8.93018C13.7784 8.93018 14.225 9.11194 14.5543 9.43548C14.8836 9.75901 15.0687 10.1978 15.0687 10.6554Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M23.0513 10.6554C23.0513 11.1129 22.8663 11.5517 22.537 11.8753C22.2077 12.1988 21.761 12.3806 21.2953 12.3806C20.8296 12.3806 20.3829 12.1988 20.0536 11.8753C19.7243 11.5517 19.5393 11.1129 19.5393 10.6554C19.5393 10.1978 19.7243 9.75901 20.0536 9.43548C20.3829 9.11194 20.8296 8.93018 21.2953 8.93018C21.761 8.93018 22.2077 9.11194 22.537 9.43548C22.8663 9.75901 23.0513 10.1978 23.0513 10.6554Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M19.0604 12.003C19.0604 12.4606 18.8753 12.8994 18.546 13.2229C18.2167 13.5465 17.7701 13.7282 17.3043 13.7282C16.8386 13.7282 16.392 13.5465 16.0627 13.2229C15.7333 12.8994 15.5483 12.4606 15.5483 12.003C15.5483 11.5455 15.7333 11.1067 16.0627 10.7831C16.392 10.4596 16.8386 10.2778 17.3043 10.2778C17.7701 10.2778 18.2167 10.4596 18.546 10.7831C18.8753 11.1067 19.0604 11.5455 19.0604 12.003Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M15.8012 14.0266C15.4757 13.7034 15.0881 13.4469 14.6608 13.272C14.2336 13.0971 13.7753 13.0073 13.3125 13.0078C11.6 13.0078 10.1757 14.2124 9.86499 15.8058H13.7106C14.1796 14.9951 14.9176 14.3671 15.8012 14.0266Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M21.2947 13.0078C20.8319 13.0073 20.3737 13.0972 19.9465 13.2721C19.5193 13.4469 19.1317 13.7034 18.8062 14.0266C19.6898 14.367 20.4277 14.9951 20.8966 15.8058H24.7422C24.4315 14.2124 23.0072 13.0078 21.2947 13.0078Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M20.1634 15.8058C20.1634 15.8056 20.1634 15.8056 20.1634 15.8058C20.1341 15.7656 20.1021 15.7277 20.0713 15.6889C20.0434 15.6536 20.0167 15.6176 19.9873 15.5835C19.9497 15.5396 19.9094 15.4985 19.8696 15.4564C19.845 15.4306 19.8215 15.4037 19.7961 15.3786C19.7493 15.3321 19.6999 15.2883 19.6504 15.2444C19.6305 15.2268 19.6115 15.2086 19.5912 15.1913C19.5351 15.1439 19.4766 15.099 19.4174 15.0549C19.4027 15.044 19.3886 15.0326 19.3739 15.0221C19.3084 14.9752 19.2412 14.9306 19.1726 14.8883C19.1632 14.8825 19.1543 14.8765 19.1449 14.8709C19.0711 14.8262 18.9956 14.7842 18.9186 14.745L18.9045 14.7377C18.8235 14.6968 18.7409 14.659 18.657 14.6245L18.6528 14.6228C18.5663 14.5874 18.4784 14.5554 18.3892 14.527L18.3888 14.5268C18.0468 14.4174 17.683 14.3555 17.3037 14.3555C16.9244 14.3555 16.5606 14.4176 16.2186 14.5268C16.1288 14.5555 16.0408 14.5874 15.9545 14.6228L15.951 14.6243C15.8664 14.659 15.7838 14.6968 15.7028 14.7377L15.6896 14.7444C15.6123 14.7837 15.5365 14.8259 15.4623 14.8707L15.4358 14.8874C15.3668 14.9299 15.2994 14.9747 15.2336 15.0217C15.219 15.0322 15.2051 15.0433 15.1906 15.054C15.1312 15.0981 15.0726 15.1431 15.0162 15.1908C14.996 15.2078 14.9771 15.226 14.9572 15.2435C14.9078 15.2874 14.8583 15.3313 14.8113 15.3778C14.7859 15.403 14.7624 15.4298 14.7378 15.4557C14.6981 15.4975 14.6578 15.5388 14.6202 15.5827C14.5907 15.6171 14.5638 15.6534 14.5357 15.6889C14.5052 15.7276 14.4733 15.7651 14.4443 15.8049C14.1519 16.2074 13.9514 16.6675 13.8564 17.1531H20.7514C20.6562 16.6677 20.4556 16.2082 20.1634 15.8058Z"
                                      fill="black"
                                    />
                                  </svg>
                                </div>
                                <h6 className="detais_numbers">
                                  <span className="value">
                                    {vehicle.passengers}
                                  </span>
                                  <span className="label">
                                    {t("cars.passengers")}
                                  </span>
                                </h6>
                              </div>

                              <div className="detail_item">
                                <h6 className="icon">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="34"
                                    height="33"
                                    viewBox="0 0 34 33"
                                    fill="none"
                                  >
                                    <g clipPath="url(#clip0_5_409)">
                                      <path
                                        d="M29.3886 7.76246H24.0992V5.57814C24.0992 3.34117 22.2828 1.52148 20.0503 1.52148H13.8247C11.5922 1.52148 9.7758 3.3414 9.7758 5.57814V7.76246H4.48644C2.2539 7.76246 0.4375 9.58238 0.4375 11.8191V27.422C0.4375 29.659 2.2539 31.4787 4.48644 31.4787H29.3886C31.6211 31.4787 33.4375 29.6588 33.4375 27.422V11.8191C33.4375 9.58214 31.6211 7.76246 29.3886 7.76246ZM11.6481 5.57791C11.6481 4.37353 12.6246 3.39359 13.8247 3.39359H20.0503C21.2504 3.39359 22.2269 4.37353 22.2269 5.57791V7.76223H11.6481V5.57791ZM22.2269 9.6348V29.6064H11.6481V9.6348H22.2269ZM2.30984 27.422V11.8191C2.30984 10.6147 3.28627 9.6348 4.48644 9.6348H9.7758V29.6064H4.48644C3.28627 29.6064 2.30984 28.6264 2.30984 27.422ZM31.5652 27.422C31.5652 28.6264 30.5887 29.6064 29.3886 29.6064H24.0992V9.6348H29.3886C30.5887 9.6348 31.5652 10.6147 31.5652 11.8191V27.422Z"
                                        fill="#000001"
                                      />
                                    </g>
                                    <defs>
                                      <clipPath id="clip0_5_409">
                                        <rect
                                          width="33"
                                          height="33"
                                          fill="white"
                                          transform="translate(0.4375)"
                                        />
                                      </clipPath>
                                    </defs>
                                  </svg>
                                </h6>
                                <h6 className="detais_numbers">
                                  <span className="value">
                                    {vehicle.luggage}
                                  </span>
                                  <span className="label">
                                    {t("cars.pieces")}
                                  </span>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="bottom">
                            <p>{vehicle.text} </p>
                          </div>
                        </div>
                        <div className="image_container">
                          <img
                            width="860"
                            height="280"
                            src={vehicle.image}
                            alt="Car 1"
                          />
                        </div>
                      </div>
                    </div>

                  ))}

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="triangle_decor triangle_decor_bottom">
          <svg
            width="1920"
            height="54"
            viewBox="0 0 1920 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 53.9644L1920 0.30957V53.9644H0Z" fill="white" />
          </svg>
        </div>
      </section>
    </>
  );

}
