import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { useNavigate } from "react-router-dom";
import esLocale from '@fullcalendar/core/locales/es';
import useEventos from '../hooks/useEventos';
import '../styles/calendarStyles.css';



const Calendar = () => {
    const navigate = useNavigate();
    const { events } = useEventos();
    const [calendarEvents, setCalendarEvents] = useState([]);

    useEffect(() => {
        const transformedEvents = events.map((event) => ({
            id: event._id,
            title: event.name,
            start: new Date(event.date),
        }));
        setCalendarEvents(transformedEvents);
    }, [events]);

    const handleDateClick = (info) => {
        console.log('Fecha seleccionada:', info);
    };

    const onClickEvent = (selected) => {
        navigate(`/events/${selected.event.id}`);
    };


    return (
        <>
            <div className="calendar-container animate__animated animate__fadeIn">
                <div className='flex flex-col md:flex-row justify-between items-center mb-4 mt-4'>
                    <h1 className='text-4xl md:text-4xl font-black text-center md:text-left mb-4 md:mb-0'>
                        🗓️ Calendario de eventos
                    </h1>
                </div>

                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                    initialView="dayGridMonth"
                    titleFormat={{ month: 'long' }}
                    events={calendarEvents}
                    dateClick={handleDateClick}
                    eventClick={onClickEvent}
                    locale={esLocale}
                    headerToolbar={{
                        start: 'title'
                    }}                     
                />

            </div>
        </>
    );
};

export default Calendar;

