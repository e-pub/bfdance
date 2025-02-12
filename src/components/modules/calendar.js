import React, { useState, useEffect } from "react";
import "../../Assets/css/calendar.css";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", link: "" });
  const [isAdmin] = useState(() => localStorage.getItem("isAdmin") === "true");  // 그대로 유지

  // 데이터 로드
  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/date/calendar.json`);
        if (!response.ok) {
          throw new Error(`Failed to load calendar data: ${response.status}`);
        }
        const data = await response.json();
        setCalendarData(data);
      } catch (error) {
        console.error("Error loading calendar data:", error);
      }
    };
    loadCalendarData();
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const handleDateClick = (date) => {
    const existingEvent = calendarData.find((item) => item.date === date);
    setSelectedDate({ date, ...existingEvent });
    setShowPopup(true);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEvent = () => {
    const updatedEvent = { date: selectedDate.date, ...newEvent };
    const updatedData = calendarData.filter((item) => item.date !== selectedDate.date);
    setCalendarData([...updatedData, updatedEvent]);
    setShowPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  return (
    <div className="wrapper-calendar">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>◀</button>
          <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
          <button onClick={handleNextMonth}>▶</button>
        </div>

        <div className="calendar-grid">
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const date = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(index + 1).padStart(2, "0")}`;
            const event = calendarData.find((item) => item.date === date);

            return (
              <div
                key={date}
                className={`calendar-cell ${event ? "has-event" : ""}`}
                onClick={() => handleDateClick(date)}
              >
                <span>{index + 1}</span>
                {event && <p>{event.title}</p>}
              </div>
            );
          })}
        </div>

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h3>{selectedDate?.title || "New Event"}</h3>
              {isAdmin ? (
                <div className="admin-input-form">
                  <label>Event Title</label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                  />
                  <label>YouTube Link</label>
                  <input
                    type="text"
                    name="link"
                    value={newEvent.link}
                    onChange={handleInputChange}
                  />
                  <button onClick={handleSaveEvent}>Save Event</button>
                </div>
              ) : (
                selectedDate?.link && (
                  <iframe
                    src={selectedDate.link.replace("watch?v=", "embed/")}
                    title={selectedDate.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )
              )}
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
