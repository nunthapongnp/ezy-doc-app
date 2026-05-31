'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { format, parse, isValid } from 'date-fns';
import { CalendarIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

const DATE_FORMAT = 'dd/MM/yyyy';
const DATE_PLACEHOLDER = 'DD/MM/YYYY';

interface InputDateProps {
    label?: string;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    disabled?: boolean;
    className?: string;
    id?: string;
}

export function InputDate({
    label,
    value,
    onChange,
    disabled = false,
    className,
    id,
}: InputDateProps) {
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(value ? format(value, DATE_FORMAT) : '');
    const [month, setMonth] = useState<Date>(value ?? new Date());

    // Sync inputValue when external value changes
    useEffect(() => {
        setInputValue(value ? format(value, DATE_FORMAT) : '');
        if (value) setMonth(value);
    }, [value]);

    const applyTextInput = (raw: string) => {
        if (!raw) {
            onChange?.(null);
            return;
        }
        const parsed = parse(raw, DATE_FORMAT, new Date());
        if (isValid(parsed)) {
            onChange?.(parsed);
            setMonth(parsed);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let raw = e.target.value;

        // Auto-insert slashes
        const digits = raw.replace(/\D/g, '').slice(0, 8);
        let formatted = digits;
        if (digits.length > 2) {
            formatted = digits.slice(0, 2) + '/' + digits.slice(2);
        }
        if (digits.length > 4) {
            formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4);
        }

        setInputValue(formatted);

        if (formatted.length === 10) {
            applyTextInput(formatted);
        } else if (formatted === '') {
            onChange?.(null);
        }
    };

    const handleInputBlur = () => {
        applyTextInput(inputValue);
        if (!inputValue) {
            onChange?.(null);
        }
    };

    const handleCalendarSelect = (date: Date | undefined) => {
        if (date) {
            const formatted = format(date, DATE_FORMAT);
            setInputValue(formatted);
            onChange?.(date);
            setMonth(date);
        } else {
            setInputValue('');
            onChange?.(null);
        }
        setOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setInputValue('');
        onChange?.(null);
    };

    const parsedForCalendar = useMemo(() => {
        const d = parse(inputValue, DATE_FORMAT, new Date());
        return isValid(d) ? d : undefined;
    }, [inputValue]);

    return (
        <div className={cn('flex flex-col gap-1.5 w-full', className)}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-xs" // font-semibold tracking-widest uppercase text-muted-foreground select-none
                >
                    {label}
                </label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <div className="relative flex items-center">
                    {/* Calendar trigger icon on the left */}
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={disabled}
                            className={cn(
                                'cursor-pointer absolute left-2 z-10 w-7 shrink-0 text-muted-foreground hover:text-foreground hover:bg-transparent',
                                open && 'text-foreground',
                            )}
                            aria-label="Open calendar"
                            tabIndex={-1}
                        >
                            <CalendarIcon className="h-4 w-4 cursor-pointer" />
                        </Button>
                    </PopoverTrigger>

                    {/* Text input */}
                    <Input
                        id={id}
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        placeholder={DATE_PLACEHOLDER}
                        disabled={disabled}
                        maxLength={10}
                        inputMode="numeric"
                        autoComplete="off"
                        className={cn(
                            'pl-9 pr-9 rounded-lg border bg-background text-sm',
                            'focus-visible:ring-2 focus-visible:ring-ring',
                            disabled && 'cursor-not-allowed opacity-50',
                        )}
                        aria-label="Date input"
                    />

                    {/* Clear button on the right */}
                    {inputValue && !disabled && (
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleClear}
                            className={cn(
                                'cursor-pointer absolute right-2 z-10 flex w-5 items-center justify-center rounded-sm',
                                'text-muted-foreground hover:text-foreground transition-colors',
                            )}
                            aria-label="Clear date"
                            tabIndex={-1}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <PopoverContent
                    className="w-auto p-0"
                    align="start"
                    sideOffset={6}
                    onOpenAutoFocus={(e) => e.preventDefault()}
                >
                    <Calendar
                        mode="single"
                        selected={parsedForCalendar}
                        onSelect={handleCalendarSelect}
                        month={month}
                        onMonthChange={setMonth}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}
