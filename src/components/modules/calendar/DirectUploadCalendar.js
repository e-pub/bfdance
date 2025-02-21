import React, { useState } from "react";

const DirectUploadCalendar = ({ isAdmin }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});

  const handleDateClick = (day) => {
    const event = events[day];

    if (isAdmin) {
      // ✅ 관리자: 글쓰기 가능
      const eventText = prompt(`Add text event for Day ${day}:`);
      const videoLink = prompt(`Add video link for Day ${day} (or leave blank for no video):`);
      if (eventText) {
        setEvents((prev) => ({
          ...prev,
          [day]: { text: eventText, video: videoLink },
        }));
      }
    } else if (event) {
      // ✅ 방문자: 등록된 이벤트만 볼 수 있음
      alert(`Event: ${event.text}\nVideo: ${event.video || "No video link"}`);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const calendarCells = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarCells.push(<div key={`empty-${i}`} className="calendar-cell empty-cell"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const event = events[day];

      calendarCells.push(
        <div
          key={day}
          className={`calendar-cell ${event ? "has-event" : "no-event"}`} // ✅ 스타일 추가
          onClick={() => (event || isAdmin ? handleDateClick(day) : null)} // ✅ 빈 날짜 클릭 차단
        >
          <span>{day}</span>
          {event ? <div className="event-marker">{event.text}</div> : <p className="no-event-text">No Event</p>}
        </div>
      );
    }

    return calendarCells;
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>← Previous</button>
        <h2>{`${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`}</h2>
        <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>Next →</button>
      </div>
      <div className="calendar-grid">{renderCalendar()}</div>
    </div>
  );
};

export default DirectUploadCalendar;
