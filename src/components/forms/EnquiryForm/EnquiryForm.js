'use client';

import { useState } from 'react';

import { Button, Select, Textarea, TextInput } from '@mantine/core';
import { IconCheck, IconChevronDown, IconSend } from '@tabler/icons-react';

import { coursePreferenceOptions, qualificationOptions } from '@/constants/site';

import classes from './EnquiryForm.module.scss';

const initialValues = {
  name: '',
  mobile: '',
  email: '',
  preferredCourse: '',
  college: '',
  location: '',
  qualification: '',
  message: '',
  website: '',
};

export default function EnquiryForm({
  compact = false,
  defaultCollege = '',
  variant = 'light',
  className = '',
}) {
  const [values, setValues] = useState({ ...initialValues, college: defaultCollege });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');
  const isDark = variant === 'dark';

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!/^[6-9]\d{9}$/.test(values.mobile.trim())) {
      next.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Enter a valid email';
    }
    if (!values.preferredCourse) next.preferredCourse = 'Select a course';
    if (!values.location.trim()) next.location = 'Location is required';
    if (!values.qualification) next.qualification = 'Select qualification';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to submit enquiry');
      }

      setStatus('success');
      setServerMessage(data.message || 'Thank you! Our counsellor will contact you soon.');
      setValues({ ...initialValues, college: defaultCollege });
    } catch (error) {
      setStatus('error');
      setServerMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  const inputStyles = isDark
    ? {
        label: { color: 'rgba(255,255,255,0.88)', fontWeight: 600, fontSize: '0.78rem' },
        input: {
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.18)',
          color: '#fff',
          borderRadius: '0.65rem',
        },
        section: { color: 'rgba(255,255,255,0.75)' },
      }
    : {
        section: { color: 'var(--brand-muted)' },
      };

  return (
    <form
      className={`${classes.form} ${compact ? classes.compact : ''} ${isDark ? classes.dark : ''} ${className}`.trim()}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={classes.heading}>
        <p className={classes.eyebrow}>Free counselling</p>
        <h2>Start Your Admission Enquiry</h2>
      </div>

      <div className={classes.grid}>
        <TextInput
          label="Student name"
          placeholder="Full name"
          value={values.name}
          onChange={(e) => updateField('name', e.currentTarget.value)}
          error={errors.name}
          required
          styles={inputStyles}
        />
        <TextInput
          label="Mobile"
          placeholder="10-digit mobile"
          value={values.mobile}
          onChange={(e) =>
            updateField('mobile', e.currentTarget.value.replace(/\D/g, '').slice(0, 10))
          }
          error={errors.mobile}
          required
          styles={inputStyles}
        />
        <TextInput
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={values.email}
          onChange={(e) => updateField('email', e.currentTarget.value)}
          error={errors.email}
          required
          styles={inputStyles}
        />
        <Select
          label="Preferred course"
          placeholder="Select course"
          data={coursePreferenceOptions}
          value={values.preferredCourse}
          onChange={(value) => updateField('preferredCourse', value || '')}
          error={errors.preferredCourse}
          required
          rightSection={<IconChevronDown size={16} />}
          styles={inputStyles}
        />
        <TextInput
          label="College / University"
          placeholder="Preferred institution"
          value={values.college}
          onChange={(e) => updateField('college', e.currentTarget.value)}
          styles={inputStyles}
        />
        <TextInput
          label="Location"
          placeholder="City / State"
          value={values.location}
          onChange={(e) => updateField('location', e.currentTarget.value)}
          error={errors.location}
          required
          styles={inputStyles}
        />
        <Select
          className={classes.full}
          label="Qualification"
          placeholder="Select qualification"
          data={qualificationOptions}
          value={values.qualification}
          onChange={(value) => updateField('qualification', value || '')}
          error={errors.qualification}
          required
          rightSection={<IconChevronDown size={16} />}
          styles={inputStyles}
        />
        <Textarea
          className={classes.full}
          label="Message"
          placeholder="Tell us about your goals"
          minRows={compact ? 2 : 3}
          value={values.message}
          onChange={(e) => updateField('message', e.currentTarget.value)}
          styles={inputStyles}
        />
      </div>

      <input
        className={classes.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={values.website}
        onChange={(e) => updateField('website', e.currentTarget.value)}
      />

      <Button
        type="submit"
        loading={status === 'loading'}
        leftSection={status === 'success' ? <IconCheck size={16} /> : <IconSend size={16} />}
        className={classes.submit}
        fullWidth
      >
        {status === 'success' ? 'Enquiry sent' : 'Submit Enquiry'}
      </Button>

      {serverMessage ? (
        <p className={status === 'error' ? classes.errorMsg : classes.successMsg}>{serverMessage}</p>
      ) : null}
    </form>
  );
}
