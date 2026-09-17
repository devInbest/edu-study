'use client';

import { Modal } from '@mantine/core';

import EnquiryForm from '@/components/forms/EnquiryForm/EnquiryForm';

import classes from './EnquiryModal.module.scss';

export default function EnquiryModal({ opened, onClose, defaultCollege = '' }) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="lg"
      radius="lg"
      padding={0}
      withCloseButton
      title={null}
      overlayProps={{
        backgroundOpacity: 0.55,
        color: '#001a3a',
        blur: 4,
      }}
      classNames={{
        content: classes.content,
        header: classes.header,
        body: classes.body,
        close: classes.close,
      }}
      aria-labelledby="enquiry-modal-title"
    >
      <EnquiryForm
        compact
        variant="dark"
        defaultCollege={defaultCollege}
        className={classes.form}
        headingId="enquiry-modal-title"
      />
    </Modal>
  );
}
