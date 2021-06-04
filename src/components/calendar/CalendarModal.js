import { useState } from "react";
import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { uiCloseModal } from "../../actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1 = now.clone().add(1, 'hours');

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const {modalOpen} = useSelector(state => state.ui);

  const [dateStart, setDateStart] = useState(now.toDate());
  const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
  const [ titleValid, setTitleValid] = useState(true);
  
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
  })

  const { title, notes, start, end } = formValues;

  const handleStartDateChange = ( e ) => {
    setDateStart( e );
    setFormValues({
      ...formValues,
      start: e
    })
  }

  const handleEndDateChange = ( e ) => {
    setDateEnd( e );
    setFormValues({
      ...formValues,
      end: e
    })
  }

  const handleInputChange = ( e ) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    const momentStart = moment( start );
    const momenteEnd = moment( end );

    if (momentStart.isSameOrAfter(momenteEnd)) {
      Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha de inicio', 'error');
      return;
    }

    if ( title.trim().length < 2 ) {
      setTitleValid(false);
      return;
    }

    setTitleValid(true);
    closeModal();

  }

  const closeModal = () => {
    dispatch( uiCloseModal());
  }

  return (
    <div>
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form className="container" onSubmit={ handleSubmitForm }>
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker
              className="form-control"
              onChange={ handleStartDateChange }
              value={ dateStart }
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              className="form-control"
              minDate={ dateStart }
              onChange={ handleEndDateChange }
              value={ dateEnd }
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className={`form-control ${ !titleValid && 'is-invalid'}`}
              placeholder="Título del evento"
              name="title"
              value={title}
              onChange={ handleInputChange }
              autoComplete="off"
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={notes}
              onChange={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};
