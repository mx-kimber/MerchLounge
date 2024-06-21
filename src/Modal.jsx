import "./Modal.css";

export function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-background">
      <section className="modal-main">
        <div className="container-col align-right">
        <button className="close" type="button" onClick={onClose}>
          X
        </button>
        </div>
        <div className="container-col align-center">
          <div className="container-col align-center">
        {children}
        </div>
        </div>
        
      </section>
    </div>
  );
}
