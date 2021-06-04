import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from "moment";
import { useDispatch } from 'react-redux';

import { Navbar } from "../ui/Navbar";
import { messages } from '../../helpers/calendar-messages';
import { CalendarEvent } from './CalendarEvent';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es-mx';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventSetActive } from '../../actions/event';

const localizer = momentLocalizer(moment);

moment.locale('es-mx')

export const CalendarScreen = () => {
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

  const events = [{
    title: 'Cumpleaños de José',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgColor: '#fafafa',
    notes: 'Comprar pastel de cumpleaños',
    user: {
      _uid: '123',
      name: 'Alejandro'
    }
  }];

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
    }

    return {
      style
    }
  };

  const onDoubleClick = (e) => {
    console.log('DoubleClick: ', e);
    dispatch( uiOpenModal());
  }
  
  const onSelectEvent = (e) => {
    console.log('onSelectEvent: ', e);
    dispatch( eventSetActive(e));
  }
  
  const onViewChange = (e) => {
    // console.log('onViewChange: ', e);
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  return (
    <div className="calendar-screen">
      <Navbar />


      <Calendar
        localizer= { localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={ messages}
        eventPropGetter={ eventStyleGetter }
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelectEvent }
        onView={ onViewChange }
        view={ lastView }
        components={{
          event: CalendarEvent
        }}
      />

        <CalendarModal />

    </div>
  );
};
