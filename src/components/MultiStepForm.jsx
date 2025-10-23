import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "../assets/styles/MultiStepForm.scss";
import "react-datepicker/dist/react-datepicker.css";
import { getVehicleSearch } from "../api";
import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { useTours } from "../context/TourContext";
export default function MultiStepForm() {
  const { t, lang } = useLanguage();
  const { tours } = useTours();

  const [formData, setFormData] = useState({
    serviceType: "",
    pickupDate: "",
    pickupHour: "",
    pickupMinute: "",
    pickupLocation: "",
    dropoffLocation: "",
    flightNumber: "",
    passengers: "",
    luggage: "",
    selectTour: "",
    selectedVehicle: "",
    tourId: "",
  });

  const passengers = Number(formData.passengers) || 1;
  const luggage = Number(formData.luggage) || 0;
  const tourId = formData.tourId;
  console.log(luggage);
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
    if (activeStep === 2) {
      await refetchVehicles(); // maşınları yalnız step 3-ə keçərkən çağırırıq
    }
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const transferLabel = t("formsLocation.types.transfer");
  const tourLabel = t("formsLocation.types.tour");

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

  const DropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
      <img
        src="/flags/form-drop-icon.svg"
        alt="dropdown"
        style={{ width: 16, height: 16 }}
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
  const renderSelect = (value, onChange, options, placeholder) => (
    <Select
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
    e.preventDefault();
    try {
      setStat("success");
    } catch (err) {
      setErrorMessage("Something went wrong!");
      setStat("error");
    }
  };
  return (
    <div className="form animate__animated animate__fadeIn">
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
            <div className="form-step-content">
              <div className="form-group">
                <label htmlFor="serviceType">Service Type:</label>
                {renderSelect(
                  formData.serviceType,
                  (val) => setFormData({ ...formData, serviceType: val }),
                  [
                    t("formsLocation.types.transfer"),
                    t("formsLocation.types.tour"),
                  ],
                  " "
                )}
              </div>

              <div className="time-date-group">
                <div className="form-group">
                  <label htmlFor="pickupDate">Pickup Date:</label>
                  <div className="custom-date-input">
                    <DatePicker
                      selected={
                        formData.pickupDate
                          ? new Date(formData.pickupDate)
                          : null
                      }
                      onChange={(date) =>
                        setFormData({
                          ...formData,
                          pickupDate: date.toISOString().split("T")[0],
                        })
                      }
                      dateFormat="yyyy-MM-dd"
                      placeholderText="Select a date"
                      customInput={
                        <input
                          type="text"
                          value={formData.pickupDate}
                          onChange={() => {}}
                          className="custom-date-input-field"
                        />
                      }
                    />
                    <div className="date-icon-wrapper">
                      <img
                        src="/flags/form-drop-icon.svg"
                        alt="calendar"
                        className="date-icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="">Pickup Time:</label>
                  <div className="time-selectors">
                    <div className="hour">
                      {renderSelect(
                        formData.pickupHour,
                        (val) => setFormData({ ...formData, pickupHour: val }),
                        hours.map((h) => h.toString().padStart(2, "0")),
                        "Hour"
                      )}
                    </div>
                    :
                    <div className="minute">
                      {renderSelect(
                        formData.pickupMinute,
                        (val) =>
                          setFormData({ ...formData, pickupMinute: val }),
                        minutes.map((m) => m.toString().padStart(2, "0")),
                        "Minute"
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {(!formData.serviceType ||
                formData.serviceType === transferLabel) && (
                <>
                  <div className="form-group">
                    <label htmlFor="pickupLocation">Pickup Location:</label>
                    {renderSelect(
                      formData.pickupLocation,
                      (val) =>
                        setFormData({ ...formData, pickupLocation: val }),
                      locations,
                      "Select Pickup"
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="dropoffLocation">Drop-off Location:</label>
                    {renderSelect(
                      formData.dropoffLocation,
                      (val) =>
                        setFormData({ ...formData, dropoffLocation: val }),
                      locations,
                      "Select Drop-off"
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="flightNumber">Flight Number:</label>
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
                    <label htmlFor="selectTour">Select tour</label>
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
                      ""
                    )}
                  </div>
                </>
              )}
              <br />
              <button
                className="flex-right"
                onClick={handleNext}
                disabled={!isStep1Valid}
              >
                Next
              </button>
            </div>
          )}

          {/* Step 2 */}
          {activeStep === 2 && (
            <div className="form-step-content">
              <div className="customer_detail">
                <label htmlFor="passenger">Number of Passengers:</label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers || 1}
                  onChange={handleChange}
                />
              </div>

              <div className="customer_detail">
                <label htmlFor="luggage">Number of Luggage:</label>
                <input
                  type="number"
                  name="luggage"
                  value={formData.luggage || 1}
                  onChange={handleChange}
                />
              </div>

              <button className="flex-left" onClick={handlePrev}>
                Previous
              </button>
              <button
                className="flex-right"
                onClick={handleNext}
                disabled={!isStep2Valid}
              >
                Next
              </button>
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
                    <img
                      src={v.image}
                      alt={v.title}
                      className="w-full h-40 object-cover"
                    />
                    <h4>{v.title}</h4>
                    <p>Passengers: {v.passengers}</p>
                    <p>Luggage: {v.luggage}</p>
                    {v.price && <p>{v.price} $</p>}

                    <button
                      className="select-vehicle-btn"
                      onClick={(e) => {
                        setFormData({ ...formData, selectedVehicle: v.id });
                        handleNext(e); // növbəti step-ə keç
                      }}
                    >
                      Select This Vehicle
                    </button>
                  </div>
                ))}

              <button className="flex-left" onClick={handlePrev}>
                Previous
              </button>
            </div>
          )}

          {/* Step 4 */}
          {activeStep === 4 && (
            <div className="form-step-content">
              <button className="flex-left" onClick={handlePrev}>
                Previous
              </button>
              <button
                className="flex-right"
                onClick={() => alert("Form submitted!")}
              >
                Submit
              </button>
            </div>
          )}
        </form>
      )}

      {/* Success və ya Error çıxışı */}
      {stat === "success" && (
        <div className="form-message success">
          <img src="/flags/success.svg" alt="success" />
          <h4>Form submitted successfully!</h4>
          <span>
            Thank you! The form has been submited successfully. We will reply
            you soon
          </span>
        </div>
      )}

      {stat === "error" && (
        <div className="form-message error">
          <img src="/icons/error.svg" alt="error" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
