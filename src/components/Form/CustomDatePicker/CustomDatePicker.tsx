'use client';

// system
import React, { useState, useCallback, useEffect, useRef } from 'react';

// contexts
import { useTheme } from '@/src/contexts/ThemeContext/ThemeContext';

// external components
import DatePicker from 'react-datepicker';

// external libs
import { ptBR } from 'date-fns/locale';

// external icons
import { FiCalendar, FiX } from 'react-icons/fi';

// styles
import 'react-datepicker/dist/react-datepicker.css';

// types
type CustomDatePickerProps = {
  /* Label for the date picker input field */
  label: string;

  /* Currently selected date */
  selectedDate: Date | null;

  /* Callback function to handle date changes */
  onChange: (date: Date | null) => void;

  /* Optional error message for the date picker */
  error?: string;

  /* Optional flag indicating if the input is required */
  required?: boolean;

  /* Unique identifier for the date picker input field */
  id: string;
};

type VariantClass = 'normal' | 'error' | 'label' | 'iconDefault' | 'iconError' | 'iconSelected';

type ThemeVariantClasses = 'light' | 'dark';

export default function CustomDatePicker({
  label,
  selectedDate,
  onChange,
  error,
  required = false,
  id
}: CustomDatePickerProps) {
  const { darkMode } = useTheme();

  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const datePickerRef = useRef<HTMLDivElement | null>(null);

  const baseInputClasses: string =
    'w-full border rounded-md px-3 py-2 pr-10 outline-none transition-colors';

  const variantClasses: Record<ThemeVariantClasses, Record<VariantClass, string>> = {
    light: {
      normal: 'bg-white text-black border-gray-300 hover:border-[#4F9E00] focus:border-[#4F9E00]',
      error: 'border-red-600 focus:border-red-600',
      label: 'text-gray-700',
      iconDefault: 'text-gray-500',
      iconError: 'text-red-600',
      iconSelected: 'text-[#4F9E00]'
    },
    dark: {
      normal:
        'bg-[#2C2C2C] text-[#F1F3F2] border-[#555555] hover:border-[#4F9E00] focus:border-[#4F9E00]',
      error: 'border-red-600 focus:border-red-600',
      label: 'text-[#F1F3F2]',
      iconDefault: 'text-gray-400',
      iconError: 'text-red-600',
      iconSelected: 'text-[#4F9E00]'
    }
  };

  const iconBaseClasses: string =
    'absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer transition-colors';

  const calendarIconClass: string = [
    iconBaseClasses,
    error
      ? darkMode
        ? variantClasses.dark.iconError
        : variantClasses.light.iconError
      : isFocused
        ? darkMode
          ? variantClasses.dark.iconSelected
          : variantClasses.light.iconSelected
        : darkMode
          ? variantClasses.dark.iconDefault
          : variantClasses.light.iconDefault,
    'group-hover:text-[#4F9E00]'
  ]
    .filter(Boolean)
    .join(' ');

  const clearIconClass: string = [
    iconBaseClasses,
    error
      ? darkMode
        ? variantClasses.dark.iconError
        : variantClasses.light.iconError
      : isFocused
        ? darkMode
          ? variantClasses.dark.iconSelected
          : variantClasses.light.iconSelected
        : darkMode
          ? variantClasses.dark.iconDefault
          : variantClasses.light.iconDefault,
    selectedDate && !error && 'group-hover:text-[#4F9E00]'
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Method responsible for toggling the calendar visibility when the calendar icon is clicked.
   *
   * @returns {void}
   */
  const handleCalendarToggle = useCallback((): void => {
    setShowCalendar((previousVisibility: boolean) => !previousVisibility);
  }, []);

  /**
   * Method responsible for clearing the selected date when the clear icon is clicked.
   *
   * @returns {void}
   */
  const handleClear = useCallback((): void => {
    onChange(null);
  }, [onChange]);

  /**
   * Method responsible for handling the focus event on the input field.
   * It shows the calendar when the input is focused.
   *
   * @returns {void}
   */
  const handleFocus = (): void => {
    setShowCalendar(true);
    setIsFocused(true);
  };

  /**
   * Method responsible for handling the blur event on the input field.
   * It hides the calendar when the input loses focus.
   *
   * @returns {void}
   */
  const handleBlur = (): void => {
    setShowCalendar(false);
    setIsFocused(false);
  };

  return (
    <div
      className="flex flex-col relative w-[384px]"
      ref={datePickerRef}
      data-testid="custom-date-picker"
    >
      <label
        htmlFor={id}
        className={`block mb-1 font-semibold ${darkMode ? variantClasses.dark.label : variantClasses.light.label}`}
        data-testid="custom-date-picker-label"
      >
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>

      <div className="relative w-[384px] group" data-testid="custom-date-picker-input-wrapper">
        <DatePicker
          id={id}
          selected={selectedDate}
          onChange={onChange}
          placeholderText="dd/mm/aaaa"
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          className={`${baseInputClasses} ${error ? (darkMode ? variantClasses.dark.error : variantClasses.light.error) : darkMode ? variantClasses.dark.normal : variantClasses.light.normal}`}
          onFocus={handleFocus}
          onBlur={handleBlur}
          open={showCalendar}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={error ? `${id}-error` : undefined}
          data-testid="custom-date-picker-input"
        />

        {!selectedDate && (
          <FiCalendar
            className={calendarIconClass}
            size={20}
            onClick={handleCalendarToggle}
            aria-label="Abrir ou fechar calendário"
            role="button"
            data-testid="custom-date-picker-calendar-icon"
          />
        )}

        {selectedDate && (
          <FiX
            className={clearIconClass}
            size={20}
            onClick={handleClear}
            aria-label="Limpar data"
            role="button"
            data-testid="custom-date-picker-clear-icon"
          />
        )}
      </div>

      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          className="text-red-600 mt-1 text-[12px]"
          data-testid="custom-date-picker-error"
        >
          {error}
        </span>
      )}
    </div>
  );
}
