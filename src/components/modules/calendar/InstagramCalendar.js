import React, { useState, useEffect } from "react";

const InstagramCalendar = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch("https://your-api-url/get-stories"); // 실제 API 엔드포인트로 변경
        if (!response.ok) {
          throw new Error("Failed to fetch stories");
        }
        const data = await response.json();
        setEvents(data); // 데이터를 상태로 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // 로딩 상태 종료
      }
    };

    fetchStories();
  }, []);

  if (isLoading) {
    return <p>Loading Instagram Stories...</p>;
  }

  if (error) {
    return <p>Error fetching stories: {error}</p>;
  }

  return (
    <div className="instagram-calendar-container">
      <h2>Instagram Calendar</h2>
      <div className="instagram-events">
        {events.length === 0 ? (
          <p>No stories available.</p>
        ) : (
          events.map((event, index) => (
            <div key={index} className="event-card">
              <p>{event.date}: {event.description}</p>
              <a href={event.link} target="_blank" rel="noopener noreferrer">View Story</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InstagramCalendar;
