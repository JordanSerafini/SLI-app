import React, { useContext, useState, useEffect } from "react";
import dataContext, { DataContextType } from "../context/dataContext";

import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import calendarGif from "../assets/calendarGif.gif";

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
  const [showCalendar, setShowCalendar] = useState(false);

  // Filtrer les événements par date
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

  // Formater la date
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

  // Gérer le changement de date du calendrier
  const handleDateChange = (value: Date | Date[]) => {
    const newDate = Array.isArray(value) ? value[0] : value;
    setSelectedDate(newDate instanceof Date ? newDate : new Date(newDate));
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      {showCalendar ? (
        <div className="w-9/10 mt-4 h-4/5">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            locale="fr-FR"
            className="bg-white p-4 rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] mb-2 w-full"
          />
          <img
            src={calendarGif}
            alt=""
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer w-10 h-10 ml-auto"
          />
        </div>
      ) : (
        <div className="flex flex-row items-center gap-2">
          <input
            id="selectedDateInput"
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="p-2 m-2 border-2 border-secondary rounded-md "
          />
          <img
            src={calendarGif}
            alt=""
            onClick={() => setShowCalendar(!showCalendar)}
            className="cursor-pointer  h-10 "

          />
        </div>
      )}
      <div className="flex flex-col gap-4 overflow-auto mb-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event: Event) => (
            <div className="collapse collapse-arrow bg-base-200" key={event.id}>
              <input
                type="radio"
                name="my-accordion"
                id={`event-${event.id}`}
                className="peer"
              />
              <div className="collapse-title text-xl font-medium">
                <label htmlFor={`event-${event.id}`}>{event.caption}</label>
              </div>
              <div className="collapse-content">
                <p>Début: {formatDate(event.startdatetime)}</p>
                <p>Fin: {formatDate(event.enddatetime)}</p>
                <p>{event.notesclear}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Pas d'événements pour cette date.</p>
        )}
      </div>
    </div>
  );
};

export default EventOfTheDay;