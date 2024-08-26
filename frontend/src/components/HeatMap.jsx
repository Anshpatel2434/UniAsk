import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

const HeatMap = () => {
  const startDate = new Date("2023-01-01");
  const endDate = new Date("2023-12-30");

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const daysInYear =
    Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

  const randomValues = getRange(daysInYear).map((index) => {
    return {
      date: shiftDate(startDate, index),
      count: getRandomInt(0, 3),
    };
  });

  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-lg w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="font-bold text-sm sm:text-base md:text-lg text-white mb-2 sm:mb-0">
          <span className="text-green-500 text-base sm:text-lg md:text-xl">
            99
          </span>{" "}
          submissions in the past one year{" "}
          <span className="text-gray-500">ⓘ</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center text-sm sm:text-base md:text-lg">
          <div className="text-gray-400 mr-2 sm:mr-4">
            Total active days: <span className="text-white">19</span>
          </div>
          <div className="text-gray-400">
            Max streak: <span className="text-white">7</span>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-scroll no-scrollbar">
        <div className="h-40 sm:h-48 md:h-44 w-[1000px] mx-auto">
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={randomValues}
            classForValue={(value) => {
              if (!value) {
                return "color-empty";
              }
              return `color-github-${value.count}`;
            }}
            tooltipDataAttrs={(value) => {
              if (!value || !value.date) {
                return;
              }
              return {
                "data-tip": `${value.date
                  .toISOString()
                  .slice(0, 10)} has count: ${value.count}`,
              };
            }}
            showWeekdayLabels={false}
            onClick={(value) =>
              alert(
                `${value.date.toISOString().slice(0, 10)} has count: ${
                  value.count
                }`
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
