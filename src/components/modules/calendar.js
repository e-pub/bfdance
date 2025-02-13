import React, { useState, useEffect } from "react";
import axios from "axios";  // axios 추가
import "../../Assets/css/calendar.css";

const GITHUB_API_BASE = "https://api.github.com/repos";
const GITHUB_REPO = "your-username/your-repo";  // GitHub 저장소 경로로 수정
const TOKEN = "YOUR_GITHUB_TOKEN";  // Personal Access Token 입력

const Calendar = () => {
  const [calendarData, setCalendarData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", link: "" });
  const [showPopup, setShowPopup] = useState(false);

  // GitHub에서 calendar.json 데이터 로드
  useEffect(() => {
    const loadCalendarData = async () => {
      try {
        const response = await axios.get(
          `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/calendar.json`,
          { headers: { Authorization: `token ${TOKEN}` } }
        );
        const data = JSON.parse(atob(response.data.content));  // Base64 디코딩
        setCalendarData(data);
      } catch (error) {
        console.error("Failed to load calendar data:", error);
      }
    };
    loadCalendarData();
  }, []);

  // 이전 달로 이동
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // 다음 달로 이동
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // 날짜 클릭 이벤트
  const handleDateClick = (date) => {
    const existingEvent = calendarData.find((item) => item.date === date);
    setSelectedDate({ date, ...existingEvent });
    setShowPopup(true);
  };

  // 입력 필드 변경
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  // 이벤트 저장 (GitHub API로 업데이트)
  const handleSaveEvent = async () => {
    const updatedEvent = { date: selectedDate.date, ...newEvent };
    const updatedData = calendarData.filter((item) => item.date !== selectedDate.date);
    const newCalendarData = [...updatedData, updatedEvent];

    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/calendar.json`,
        { headers: { Authorization: `token ${TOKEN}` } }
      );
      const sha = response.data.sha;

      await axios.put(
        `${GITHUB_API_BASE}/${GITHUB_REPO}/contents/data/calendar.json`,
        {
          message: "Update calendar event",
          content: btoa(JSON.stringify(newCalendarData, null, 2)),  // Base64 인코딩
          sha: sha,
        },
        { headers: { Authorization: `token ${TOKEN}` } }
      );

      setCalendarData(newCalendarData);
      setShowPopup(false);
      alert("Event saved successfully!");
    } catch (error) {
      console.error("Failed to update calendar data:", error);
      alert("Failed to save event.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedDate(null);
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  return (
    <div className="wrapper-calendar">
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>◀</button>
          <h2>{currentDate.toLocaleString("default", { month: "long" })} {currentDate.getFullYear()}</h2>
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
              <div className="admin-input-form">
                <label>Event Title</label>
                <input type="text" name="title" value={newEvent.title} onChange={handleInputChange} />
                <label>YouTube Link</label>
                <input type="text" name="link" value={newEvent.link} onChange={handleInputChange} />
                <button onClick={handleSaveEvent}>Save Event</button>
              </div>
              <button onClick={closePopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
