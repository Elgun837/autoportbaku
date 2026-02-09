import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "../assets/styles/MultiStepForm.scss";
import "react-datepicker/dist/react-datepicker.css";
import { getVehicleSearch } from "../api";
import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { useTours } from "../context/TourContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getVehicleRequest } from "../api";
import { useCurrency } from "../context/CurrencyContext";
import Price from "./Price";
import OptimizedImage from "./OptimizedImage";
import DOMPurify from "dompurify";
import Toasts from "./Toasts.jsx";
export default function MultiStepForm() {
  const { t, lang } = useLanguage();
  const { tours } = useTours();
  const [phone, setPhone] = useState("");
  const { currency, rate } = useCurrency();
  const [errors, setErrors] = useState({});
  const [newErrors, setNewErrors] = useState({});

  const [formData, setFormData] = useState({
    serviceType: "",
    pickupDate: "",
    pickupHour: "",
    pickupMinute: "",
    pickupLocation: "",
    dropoffLocation: "",
    flightNumber: "",
    passengers: "",
    luggage: 1,
    selectTour: "",
    selectedVehicle: "",
    tourId: "",
    name: "",
    email: "",
    phone: "",
  });

  const passengers = Number(formData.passengers) || 1;
  const luggage = Number(formData.luggage) || 0;
  const tourId = formData.tourId;
  const formatPickupDate = () => {
    if (!formData.pickupDate || !formData.pickupHour || !formData.pickupMinute)
      return null;

    const date = new Date(formData.pickupDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(formData.pickupHour).padStart(2, "0");
    const minute = String(formData.pickupMinute).padStart(2, "0");

    return `${day}-${month}-${year} ${hour}:${minute}`;
  };
  const pickup_date = formatPickupDate();

  const {
    data: vehiclesData,
    isFetching: vehiclesLoading,
    refetch: refetchVehicles,
  } = useQuery({
    queryKey: ["vehicle", lang, tourId, passengers, luggage],
    queryFn: () => getVehicleSearch(lang, tourId, passengers, luggage),
    enabled: false, // avtomatik çağırılmasın
  });

  const vehicles = Array.isArray(vehiclesData) ? vehiclesData : [];

  const [activeStep, setActiveStep] = useState(1);

  const locations = [
    t("formsLocation.AirpirtBaku"),
    t("formsLocation.BakuAirport"),
  ];

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "passengers" || name === "luggage" ? Number(value) : value,
    });
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // yalnız Step 1 üçün yoxlama aparırıq
    if (activeStep === 1) {
      const newErrors = {};

      if (!formData.serviceType)
        newErrors.serviceType = t("validation.selectServiceType");
      if (!formData.pickupDate)
        newErrors.pickupDate = t("validation.invalidDate");
      if (!formData.pickupHour)
        newErrors.pickupHour = t("validation.invalidHour");
      if (!formData.pickupMinute)
        newErrors.pickupMinute = t("validation.invalidMinute");

      // transfer üçün əlavə sahələr
      if (formData.serviceType === transferLabel && !formData.pickupLocation)
        newErrors.pickupLocation = t("validation.selectPickupLocation");

      if (formData.serviceType === transferLabel && !formData.dropoffLocation)
        newErrors.dropoffLocation = t("validation.selectDropoffLocation");

      // tour üçün
      if (formData.serviceType === tourLabel && !formData.selectTour)
        newErrors.selectTour = t("validation.selectTour");

      setErrors({});
      setTimeout(() => {
        setErrors(newErrors);

        const errorList = Object.values(newErrors).filter(Boolean);
        errorList.forEach((err) => showToast(err));
      }, 0);
      // ------------------------------------------------

      // Errorlar varsa, step dəyişmə
      if (Object.keys(newErrors).length > 0) {
        return;
      }

      // Error yoxdur → Step 2
      setActiveStep(2);
      return;
    }

    // Step 2 və 3 üçün sənin mövcud məntiqini saxlayırıq
    if (activeStep === 2) {
      await refetchVehicles();
    }
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const transferLabel = t("formsLocation.types.transfer");
  const tourLabel = t("formsLocation.types.tour");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  let isStep1Valid = false;

  if (formData?.serviceType === transferLabel) {
    isStep1Valid =
      !!formData.serviceType &&
      !!formData.pickupDate &&
      !!formData.pickupHour &&
      !!formData.pickupMinute &&
      !!formData.pickupLocation &&
      !!formData.dropoffLocation;
  } else if (formData?.serviceType === tourLabel) {
    isStep1Valid =
      !!formData.serviceType &&
      !!formData.pickupDate &&
      !!formData.pickupHour &&
      !!formData.pickupMinute &&
      !!formData.selectTour;
  } else {
    isStep1Valid = false;
  }

  if (formData.pickupDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(formData.pickupDate);

    if (selectedDate < today) {
      isStep1Valid = false;
    }
  }
  const isStep2Valid =
    Number(formData.passengers) > 0 && Number(formData.luggage) >= 0;

  const isStep3Valid = !!formData.selectedVehicle;
  const isStep4Valid =
    formData.user_name?.trim() &&
    formData.email?.trim() &&
    validateEmail(formData.email) && // <-- email format check əlavə edildi
    formData.phone?.trim();
  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <OptimizedImage
        src="/flags/form-drop-icon.svg"
        alt="dropdown"
        width={16}
        height={16}
        lazy={true}
      />
    </components.DropdownIndicator>
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#fff",
      borderColor: "#ccc",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f8f8f8",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#eee" : "#fff",
      color: "#000000ff",
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
    }),
  };
  const renderSelect = (value, onChange, options, placeholder, inputId) => (
    <Select
      inputId={inputId}
      value={value ? { value, label: value } : null}
      onChange={(selected) => onChange(selected.value)}
      options={options.map((opt) => ({ value: opt, label: opt }))}
      placeholder={placeholder}
      classNamePrefix="react-select"
      components={{ DropdownIndicator, IndicatorSeparator: () => null }}
      isSearchable={false}
      styles={customStyles}
    />
  );
  const [stat, setStat] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // form default davranışını dayandırır
    const newErrors = {};
    // Step 4 validasiyası
    if (!formData.user_name?.trim()) {
      newErrors.user_name = t("validation.enterName");
    }

    if (!formData.email?.trim()) {
      newErrors.email = t("validation.enterEmail");
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = t("validation.enterPhone");
    }

    setErrors({});
    setTimeout(() => {
      setErrors(newErrors);

      // Toastları göstər
      const errorList = Object.values(newErrors).filter(Boolean);
      errorList.forEach((err) => showToast(err));
    }, 0);
    // ------------------------------------------------

    // Error varsa submit dayandır
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      // API-yə göndəriləcək məlumatları formData-dan götürə bilərsən
      const payload = {
        vehicle_id: formData.selectedVehicle,
        tour_id: formData.tourId,
        type: formData.serviceType,
        pickup_date: pickup_date,
        dropoff_location: formData.dropoffLocation,
        pickup_location: formData.pickupLocation,
        flight_number: formData.flightNumber,
        passengers: formData.passengers,
        luggage: formData.luggage,
        name: formData.user_name,
        email: formData.email,
        phone: formData.phone,
        comment: formData.specialRequirements,
        price:
          vehicles.find((v) => v.id === formData.selectedVehicle)?.price ||
          null,
        currency: currency,
      };
      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(
          ([_, value]) => value !== "" && value !== null && value !== undefined
        )
      );

      // getVehicleRequest funksiyasını çağırıb payload göndərmək
      const response = await getVehicleRequest(lang, cleanedPayload); // lang varsa formData-dan al

      // Success status və step dəyişimi
      setStat("success");
      setActiveStep(activeStep + 1);
    } catch (error) {
      console.error("Form submit failed:", error);
      setStat("error");
    }
  };

  return (
    <div className="form ">
      <div id="toast-container" className="toast-container"></div>

      <div className="form-header">
        <div className="steps-indicator">
          {[1, 2, 3, 4].map((step) => (
            <React.Fragment key={step}>
              <div
                className={`form-step 
                ${activeStep === step ? "active" : ""} 
                ${activeStep > step || stat === "success" ? "completed" : ""}`}
              >
                {step}
              </div>
              <div className={`line-${step}`}></div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {stat === "" && (
        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {activeStep === 1 && (
            <div className="form-step-content" id="main_selection">
              <div className="form-group">
                <label htmlFor="serviceType">
                  {t("formsLocation.types.serviceType")}:
                </label>
                {renderSelect(
                  formData.serviceType,
                  (val) => setFormData({ ...formData, serviceType: val }),
                  [
                    t("formsLocation.types.transfer"),
                    t("formsLocation.types.tour"),
                  ],
                  " ",
                  "serviceType"
                )}
              </div>

              <div className="time-date-group">
                <div className="form-group">
                  <label htmlFor="pickupDate">
                    {t("formsLocation.types.pickupDate")}:
                  </label>
                  <div className="custom-date-input">
                    <DatePicker
                      id="pickupDate"
                      selected={
                        formData.pickupDate
                          ? new Date(formData.pickupDate)
                          : null
                      }
                      onChange={(date) => {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(
                          2,
                          "0"
                        );
                        const day = String(date.getDate()).padStart(2, "0");
                        setFormData({
                          ...formData,
                          pickupDate: `${year}-${month}-${day}`,
                        });
                      }}
                      dateFormat="yyyy-MM-dd"
                      minDate={new Date()}
                      customInput={
                        <input
                          type="text"
                          id="pickupDate"
                          value={formData.pickupDate}
                          onChange={() => {}}
                          className="custom-date-input-field"
                        />
                      }
                    />
                    <div className="date-icon-wrapper">
                      <OptimizedImage
                        src="/flags/form-drop-icon.svg"
                        alt="calendar"
                        className="date-icon"
                        lazy={true}
                        width={16}
                        height={16}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="pickupHour">
                    {t("formsLocation.types.pickupTime")}:
                  </label>
                  <div className="time-selectors">
                    <div className="hour">
                      {renderSelect(
                        formData.pickupHour,
                        (val) => setFormData({ ...formData, pickupHour: val }),
                        hours.map((h) => h.toString().padStart(2, "0")),
                        "13",
                        "pickupHour"
                      )}
                    </div>
                    :
                    <div className="minute">
                      {renderSelect(
                        formData.pickupMinute,
                        (val) =>
                          setFormData({ ...formData, pickupMinute: val }),
                        minutes.map((m) => m.toString().padStart(2, "0")),
                        "00",
                        "pickupMinute"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {(!formData.serviceType ||
                formData.serviceType === transferLabel) && (
                <>
                  <div className="form-group">
                    <label htmlFor="pickupLocation">
                      {t("formsLocation.types.pickupLocation")}:
                    </label>
                    {renderSelect(
                      formData.pickupLocation,
                      (val) =>
                        setFormData({
                          ...formData,
                          pickupLocation: val,
                          dropoffLocation:
                            formData.dropoffLocation === val
                              ? null
                              : formData.dropoffLocation,
                        }),
                      locations,
                      `${t("formsLocation.types.pickupPlace")}`,
                      "pickupLocation"
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dropoffLocation">
                      {t("formsLocation.types.dropoffLocation")}:
                    </label>
                    {renderSelect(
                      formData.dropoffLocation,
                      (val) =>
                        setFormData({ ...formData, dropoffLocation: val }),
                      // pickupLocation-ı çıxırıq
                      locations.filter(
                        (loc) => loc !== formData.pickupLocation
                      ),
                      `${t("formsLocation.types.dropoffPlace")}`,
                      "dropoffLocation"
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="flightNumber">
                      {t("formsLocation.types.flightNumber")}:
                    </label>
                    <input
                      type="text"
                      name="flightNumber"
                      id="flightNumber"
                      value={formData.flightNumber}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              {formData.serviceType === tourLabel && (
                <>
                  <div className="form-group">
                    <label htmlFor="selectTour">
                      {t("formsLocation.types.selectTour")}
                    </label>
                    {renderSelect(
                      formData.selectTour, // hazırki seçilmiş tour-un title-ı (string)
                      (selectedTitle) => {
                        const tour = tours.find(
                          (t) => (t.title?.[lang] || t.title) === selectedTitle
                        );
                        setFormData({
                          ...formData,
                          selectTour: selectedTitle, // React-Select üçün lazım
                          tourId: tour?.id || null, // API üçün lazım
                        });
                      },
                      tours.map(
                        (t) => t.title?.[lang] || t.title || "No title"
                      ), // string array
                      "",
                      "selectTour"
                    )}
                  </div>
                </>
              )}
              <br />
              <Toasts errors={errors} />
              <div className="button_group">
                <button
                  className="flex-right"
                  onClick={handleNext}
                  // disabled={!isStep1Valid}
                >
                  {t("formsLocation.types.nextBtn")}
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {activeStep === 2 && (
            <div className="form-step-content">
              <div className="customer_detail">
                <label htmlFor="passengers">
                  {t("formsLocation.types.passengers")}:
                </label>
                <input
                  type="text"
                  id="passengers"
                  name="passengers"
                  placeholder="0"
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // yalnız rəqəmlərə icazə ver
                    }
                  }}
                />
              </div>

              <div className="customer_detail">
                <label htmlFor="luggage">
                  {t("formsLocation.types.luggage")}:
                </label>
                <input
                  type="text"
                  id="luggage"
                  name="luggage"
                  placeholder="0"
                  onChange={handleChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault(); // yalnız rəqəmlərə icazə ver
                    }
                  }}
                />
              </div>
              <Toasts errors={errors} />
              <div className="button_group">
                <button className="flex-left" onClick={handlePrev}>
                  {t("formsLocation.types.prevBtn")}
                </button>
                <button
                  className="flex-right"
                  onClick={handleNext}
                  disabled={!isStep2Valid}
                >
                  {t("formsLocation.types.nextBtn")}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {activeStep === 3 && (
            <div className="form-step-content">
              {vehiclesLoading && <p>Loading vehicles...</p>}

              {!vehiclesLoading && vehicles.length === 0 && (
                <p>No vehicles found for your selection.</p>
              )}

              {!vehiclesLoading &&
                vehicles.map((v) => (
                  <div
                    key={v.id}
                    className={`vehicle-card ${
                      formData.selectedVehicle === v.id ? "selected" : ""
                    }`}
                  >
                    <h4>{v.title}</h4>
                    <OptimizedImage
                      src={v.image}
                      alt={`${v.title} vehicle`}
                      className=""
                      lazy={true}
                      width={200}
                      height={150}
                    />
                    <p className="price">
                      <Price price={v.price} />
                    </p>
                    <p
                      className="vehicle_desc"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(v.text),
                      }}
                    />
                    <div className="vehicle-spec">
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M7.21886 6.1875C6.74295 6.1875 6.27772 6.04638 5.88202 5.78197C5.48631 5.51757 5.1779 5.14177 4.99577 4.70208C4.81365 4.2624 4.766 3.77858 4.85884 3.31181C4.95169 2.84505 5.18086 2.4163 5.51738 2.07978C5.8539 1.74326 6.28265 1.51408 6.74942 1.42124C7.21619 1.32839 7.7 1.37604 8.13969 1.55817C8.57937 1.74029 8.95518 2.0487 9.21958 2.44441C9.48398 2.84012 9.62511 3.30534 9.62511 3.78125C9.62438 4.4192 9.37063 5.03082 8.91953 5.48192C8.46843 5.93302 7.85681 6.18677 7.21886 6.1875ZM7.21886 2.75C7.0149 2.75 6.81551 2.81048 6.64593 2.9238C6.47634 3.03711 6.34416 3.19817 6.26611 3.38661C6.18805 3.57504 6.16763 3.78239 6.20742 3.98244C6.24721 4.18248 6.34543 4.36623 6.48965 4.51045C6.63388 4.65468 6.81763 4.75289 7.01767 4.79269C7.21771 4.83248 7.42506 4.81205 7.6135 4.734C7.80194 4.65595 7.963 4.52377 8.07631 4.35418C8.18963 4.18459 8.25011 3.98521 8.25011 3.78125C8.25011 3.50775 8.14146 3.24544 7.94806 3.05205C7.75466 2.85865 7.49236 2.75 7.21886 2.75ZM15.451 21.5277L13.2964 16.5H8.41442C7.80848 16.4991 7.21971 16.2986 6.73914 15.9296C6.25858 15.5605 5.91301 15.0433 5.75586 14.4581L4.63248 10.2458C4.44933 9.55886 4.54656 8.82729 4.9028 8.21203C5.25904 7.59677 5.84509 7.14822 6.53205 6.96506C7.219 6.78191 7.95057 6.87914 8.56583 7.23538C9.18109 7.59162 9.62964 8.17767 9.81279 8.86463L10.3814 11H14.4376V12.375H9.32536L8.48454 9.21938C8.38681 8.89452 8.16652 8.62043 7.87029 8.4551C7.57406 8.28976 7.22513 8.24616 6.89733 8.33352C6.56952 8.42087 6.28856 8.63233 6.11389 8.92315C5.93922 9.21397 5.88454 9.56133 5.96142 9.89175L7.08411 14.1034C7.1626 14.3963 7.33549 14.6551 7.57599 14.8398C7.81649 15.0245 8.11118 15.1247 8.41442 15.125H14.2032L16.7153 20.9859L15.451 21.5277ZM20.6251 4.125H17.8751V1.375H16.5001V4.125H13.7501V5.5H16.5001V8.25H17.8751V5.5H20.6251V4.125Z"
                            fill="white"
                          />
                          <path
                            d="M12.375 19.25H5.34052C5.03746 19.2501 4.74287 19.15 4.50254 18.9654C4.26222 18.7808 4.08962 18.5219 4.01158 18.2291L1.39771 8.42738L2.72664 8.07263L5.34052 17.875H12.375V19.25Z"
                            fill="white"
                          />
                        </svg>
                        max {v.passengers}{" "}
                        {t("formsLocation.types.maxPassengers")}
                      </p>
                      <p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_176_3753)">
                            <path
                              d="M19.3007 5.17493H15.7745V3.71872C15.7745 2.2274 14.5635 1.01428 13.0752 1.01428H8.92482C7.43647 1.01428 6.22553 2.22756 6.22553 3.71872V5.17493H2.69929C1.21094 5.17493 0 6.38821 0 7.87937V18.2813C0 19.7726 1.21094 20.9858 2.69929 20.9858H19.3007C20.7891 20.9858 22 19.7725 22 18.2813V7.87937C22 6.38806 20.7891 5.17493 19.3007 5.17493ZM7.47376 3.71857C7.47376 2.91564 8.12471 2.26235 8.92482 2.26235H13.0752C13.8753 2.26235 14.5262 2.91564 14.5262 3.71857V5.17478H7.47376V3.71857ZM14.5262 6.42316V19.7375H7.47376V6.42316H14.5262ZM1.24823 18.2813V7.87937C1.24823 7.07645 1.89918 6.42316 2.69929 6.42316H6.22553V19.7375H2.69929C1.89918 19.7375 1.24823 19.0842 1.24823 18.2813ZM20.7518 18.2813C20.7518 19.0842 20.1008 19.7375 19.3007 19.7375H15.7745V6.42316H19.3007C20.1008 6.42316 20.7518 7.07645 20.7518 7.87937V18.2813Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_176_3753">
                              <rect width="22" height="22" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        max {v.luggage} {t("formsLocation.types.maxLuggage")}
                      </p>
                    </div>

                    <button
                      className="select-vehicle-btn"
                      onClick={(e) => {
                        setFormData({ ...formData, selectedVehicle: v.id });
                        handleNext(e); // növbəti step-ə keç
                      }}
                    >
                      {t("formsLocation.types.selectBtn")}
                    </button>
                  </div>
                ))}

              <div className="button_group">
                <button className="flex-left" onClick={handlePrev}>
                  {t("formsLocation.types.prevBtn")}
                </button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {activeStep === 4 && (
            <div className="form-step-content">
              <div className="form-group">
                <label htmlFor="user_name">
                  {t("formsLocation.types.name")}
                </label>
                <input
                  type="text"
                  name="user_name"
                  id="user_name"
                  value={formData.user_name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, user_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">{t("formsLocation.types.email")}</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {!validateEmail(formData.email) && formData.email && (
                  <p className="error">{t("formsLocation.types.mailError")}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t("formsLocation.types.phone")}:</label>
                <PhoneInput
                  inputProps={{
                    id: "phone",
                    name: "phone",
                  }}
                  className="phone-input"
                  country={"az"} // default ölkə
                  value={formData.phone}
                  onChange={(phone) => setFormData({ ...formData, phone })}
                  inputStyle={{ width: "100%" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="special_req">
                  {t("formsLocation.types.specialRequests")}:
                </label>
                <textarea
                  name="special_req"
                  id="special_req"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specialRequirements: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <Toasts errors={errors} />

              <div className="button_group">
                <button className="flex-left" onClick={handlePrev}>
                  {t("formsLocation.types.prevBtn")}
                </button>
                <button
                  className="flex-right"
                  onClick={handleSubmit}
                  // düymə yalnız sahələr dolu olduqda aktiv olur
                >
                  {t("formsLocation.types.submitBtn")}
                </button>
              </div>
            </div>
          )}
        </form>
      )}

      {/* Success və ya Error çıxışı */}
      {stat === "success" && (
        <div className="form-message success">
          <OptimizedImage
            src="/flags/success.svg"
            alt="success"
            lazy={true}
            width={24}
            height={24}
          />
          <h4>{t("formsLocation.types.iconMsg")}!</h4>
          <span>{t("formsLocation.types.successMsg")}</span>
        </div>
      )}

      {stat === "error" && (
        <div className="form-message error">
          <OptimizedImage
            src="/icons/error.svg"
            alt="error"
            lazy={true}
            width={24}
            height={24}
          />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
