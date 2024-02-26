import { useContext, useState, useEffect } from "react";
import dataContext from "../context/dataContext";

const EventOfTheDay = () => {
  const { eventList } = useContext(dataContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventOfTheDay, setEventOfTheDay] = useState<Event | null>(null);

  const filteredEvents = eventList.filter((event) => {
    const eventDate = new Date(event.startdatetime);
    return (
      eventDate.getFullYear() === selectedDate.getFullYear() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getDate() === selectedDate.getDate()
    );
  });


  return <div>
    <h1>Evenement du jour</h1>
    <div>
      <input type="date" value={selectedDate.toISOString().split('T')[0]} onChange={(e) => setSelectedDate(new Date(e.target.value))} />
    </div>
    <div>
      {filteredEvents.map((event) => (
        <div key={event.id}>
          <h2>{event.caption}</h2>
          <p>{event.notesclear}</p>
        </div>
      ))}
    </div>
  </div>;
};

export default EventOfTheDay;
