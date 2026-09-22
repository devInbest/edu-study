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
  stacked = false,
  defaultCollege = '',
  variant = 'light',
  className = '',
  headingId,
  title = 'Start Your Admission Enquiry',
  eyebrow = 'Free counselling',
  accentTitle = false,
}) {
  const [values, setValues] = useState({ ...initialValues, college: defaultCollege });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');
  const isDark = variant === 'dark' || variant === 'glass';
  const isGlass = variant === 'glass';

  function updateField(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function validate() {
    const next = {};
    const name = values.name.trim();
    const mobile = values.mobile.trim();
    const email = values.email.trim();
    const college = values.college.trim();
    const location = values.location.trim();
    const message = values.message.trim();

    if (!name) {
      next.name = 'Name is required';
    } else if (name.length < 3) {
      next.name = 'Enter at least 3 characters';
    } else if (!/^[a-zA-Z\s.'-]+$/.test(name)) {
      next.name = 'Name can only contain letters';
    }

    if (!mobile) {
      next.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      next.mobile = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!email) {
      next.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = 'Enter a valid email';
    }

    if (!values.preferredCourse) next.preferredCourse = 'Select a course';

    if (!college) {
      next.college = 'College / University is required';
    } else if (college.length < 3) {
      next.college = 'Enter at least 3 characters';
    }

    if (!location) {
      next.location = 'Location is required';
    } else if (location.length < 3) {
      next.location = 'Enter at least 3 characters';
    }

    if (!values.qualification) next.qualification = 'Select qualification';

    if (!message) {
      next.message = 'Message is required';
    } else if (message.length < 10) {
      next.message = 'Please share a bit more (at least 10 characters)';
    } else if (message.length > 150) {
      next.message = 'Message must be 150 characters or fewer';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('/api/enquiry.php', {
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
      setErrors({});
    } catch (error) {
      setStatus('error');
      setServerMessage(error.message || 'Something went wrong. Please try again.');
    }
  }

  const inputStyles = isDark
    ? {
        label: { color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: '0.78rem' },
        input: {
          background: isGlass ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
          border: isGlass ? '1px solid rgba(255,255,255,0.28)' : '1px solid rgba(255,255,255,0.18)',
          color: '#fff',
          borderRadius: '0.65rem',
          backdropFilter: isGlass ? 'blur(8px)' : undefined,
          '::placeholder': {
            color: isGlass ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.5)',
          },
        },
        section: { color: 'rgba(255,255,255,0.8)' },
      }
    : {
        section: { color: 'var(--brand-muted)' },
      };

  return (
    <form
      className={`${classes.form} ${compact ? classes.compact : ''} ${stacked ? classes.stacked : ''} ${variant === 'dark' ? classes.dark : ''} ${isGlass ? classes.glass : ''} ${className}`.trim()}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={`${classes.heading} ${accentTitle ? classes.accentTitle : ''}`.trim()}>
        {eyebrow ? <p className={classes.eyebrow}>{eyebrow}</p> : null}
        {title ? (
          <h2 id={headingId} className={accentTitle ? classes.accentHeadline : undefined}>
            {title}
          </h2>
        ) : null}
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
          error={errors.college}
          required
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
          maxLength={150}
          value={values.message}
          onChange={(e) => updateField('message', e.currentTarget.value)}
          error={errors.message}
          required
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
        radius="sm"
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
