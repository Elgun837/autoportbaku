import { useState } from "react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "../assets/styles/MultiStepForm.scss";
import "react-datepicker/dist/react-datepicker.css";
export default function MultiStepForm() {
  const [activeStep, setActiveStep] = useState(1);
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
  });

  const locations = ["Baku Airport", "City Center", "Hotel XYZ"];

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (activeStep < 4) setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    if (activeStep > 1) setActiveStep(activeStep - 1);
  };

  const isStep1Valid =
    formData?.serviceType &&
    (formData.serviceType === "Tour" ||
      (formData.pickupDate &&
        formData.pickupHour &&
        formData.pickupMinute !== "" &&
        formData.pickupLocation &&
        formData.dropoffLocation)) &&
    (formData.serviceType === "Standart" || formData.selectTour);

  const isStep2Valid = formData.passengers && formData.luggage;

  // Custom dropdown icon
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
      backgroundColor: "#f8f8f8", // açılan menyu rəngi
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#eee" : "#fff",
      color: "#000000ff", // text rəngi
      cursor: "pointer",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#888", // placeholder rəngi
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333", // seçilmiş dəyər rəngi
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

  return (
    <div className="form" style={{ maxWidth: "530px" }}>
      {/* Step indicator */}
      <div className="form-header">
        <div className="steps-indicator">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`form-step 
                ${activeStep === step ? "active" : ""} 
                ${activeStep > step ? "completed" : ""}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 */}
      {activeStep === 1 && (
        <div className="form-step-content">
          <div className="form-group">
            <label htmlFor="serviceType">Service Type:</label>
            {renderSelect(
              formData.serviceType,
              (val) => setFormData({ ...formData, serviceType: val }),
              ["Standard", "Tour"],
              " "
            )}
          </div>

          <div className="time-date-group">
            <div className="form-group">
              <label htmlFor="pickupDate">Pickup Date:</label>
              <div className="custom-date-input">
                <DatePicker
                  selected={
                    formData.pickupDate ? new Date(formData.pickupDate) : null
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
              <label>Pickup Time:</label>
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
                    (val) => setFormData({ ...formData, pickupMinute: val }),
                    minutes.map((m) => m.toString().padStart(2, "0")),
                    "Minute"
                  )}
                </div>
              </div>
            </div>
          </div>

          {(!formData.serviceType || formData.serviceType === "Standard") && (
            <>
              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location:</label>
                {renderSelect(
                  formData.pickupLocation,
                  (val) => setFormData({ ...formData, pickupLocation: val }),
                  locations,
                  "Select Pickup"
                )}
              </div>

              <div className="form-group">
                <label htmlFor="dropoffLocation">Drop-off Location:</label>
                {renderSelect(
                  formData.dropoffLocation,
                  (val) => setFormData({ ...formData, dropoffLocation: val }),
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
          {formData.serviceType === "Tour" && (
            <>
              <div className="form-group">
                <label htmlFor="selectTour">Select tour</label>
                {renderSelect(
                  formData.selectTour,
                  (val) => setFormData({ ...formData, selectTour: val }),
                  ["Tour 1", "Tour 2", "Tour 3"],
                  " Select Tour"
                )}
              </div>
            </>
          )}
          <br />
          <button onClick={handleNext} disabled={!isStep1Valid}>
            Next
          </button>
        </div>
      )}

      {/* Step 2 */}
      {activeStep === 2 && (
        <div className="form-step-content">
          <label>Number of Passengers:</label>
          <input
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
          />

          <br />

          <label>Number of Luggage:</label>
          <input
            type="number"
            name="luggage"
            value={formData.luggage}
            onChange={handleChange}
          />

          <br />
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext} disabled={!isStep2Valid}>
            Next
          </button>
        </div>
      )}

      {/* Step 3 */}
      {activeStep === 3 && (
        <div className="form-step-content">
          <p>Step 3 content (to be added later)</p>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

      {/* Step 4 */}
      {activeStep === 4 && (
        <div className="form-step-content">
          <p>Step 4 content (to be added later)</p>
          <button onClick={handlePrev}>Previous</button>
          <button onClick={() => alert("Form submitted!")}>Submit</button>
        </div>
      )}
    </div>
  );
}
