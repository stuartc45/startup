import React, { useEffect, useState } from 'react';

export function HolidayOfTheDay({ countryCode = 'US' }) {
  const [holiday, setHoliday] = useState(null);

  useEffect(() => {
    async function fetchHoliday() {
        const year = new Date().getFullYear();
        const today = new Date().toISOString().slice(0, 10);
        const response = await fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`);
        if (!response.ok) {
            console.error("Holiday API error");
            return;
        }
        const holidays = await response.json();
        const todayHoliday = holidays.find(h => h.date === today);
        if (todayHoliday) {
            setHoliday(todayHoliday);
        }
    }
    fetchHoliday();
    }, [countryCode]);

    if (!holiday) {
        return <div>No holiday today</div>;
    }

    return (
        <div>
        <strong>Holiday Today:</strong> {holiday.name} ({holiday.localName})
        </div>
    );
}
