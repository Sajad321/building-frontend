import React from "react";
import { Modal, Button } from "react-bootstrap";

export function AddModal(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dir="rtl"
      className="text-white"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">اضافة</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-right">
        <h4>ماذا تريد ان تضيف ؟</h4>
      </Modal.Body>
      <Modal.Footer
        className="m-0 align-items-center justify-content-center"
        dir="ltr"
      >
        <div className="">
          <Button
            onClick={() => {
              props.AddStudentButton();
              props.onHide();
            }}
            className="modal-add-nav"
          >
            مكتب
          </Button>
        </div>
        <div className="">
          <Button
            onClick={() => {
              props.AddInstituteButton();
              props.onHide();
            }}
            className="modal-add-nav"
          >
            وصل
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
