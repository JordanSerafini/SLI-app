import React, { useContext, useState, useEffect } from "react";
import { DataContextType } from "../context/dataContext";
import dataContext from "../context/dataContext";

interface Event {
  id: number;
  workingduration_editedduration: number;
  notesclear: string;
  caption: string;
  startdatetime: string;
  enddatetime: string;
}

const EventOfTheDay = () => {
  const { eventList } = useContext<DataContextType>(dataContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  useEffect(() => {
    const filterEventsBySelectedDate = () => {
      const filteredEvents = eventList.filter((event) => {
        const eventDate = new Date(event.startdatetime);
        return (
          eventDate.getFullYear() === selectedDate.getFullYear() &&
          eventDate.getMonth() === selectedDate.getMonth() &&
          eventDate.getDate() === selectedDate.getDate()
        );
      });
      setFilteredEvents(filteredEvents);
    };

    filterEventsBySelectedDate();
  }, [eventList, selectedDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <h1>Événement du jour</h1>
      <div>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      {filteredEvents.length > 0 &&
        filteredEvents.map((event: Event) => (
          <div key={event.id}>
            <h2>{event.caption}</h2>
            <p>Début: {formatDate(event.startdatetime)}</p>
            <p>Fin: {formatDate(event.enddatetime)}</p>
            <p>{event.notesclear}</p>
          </div>
        ))}
    </div>
  );
};

export default EventOfTheDay;
