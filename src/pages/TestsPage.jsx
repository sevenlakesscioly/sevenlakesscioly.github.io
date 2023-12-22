import { useEffect, useState } from "react";
import { resources } from "../resource_tests";
import Link from "../components/Link";

export default function TestsPage(props) {
  let thisYear = new Date().getFullYear();

  let [scoresheet, setScoresheet] = useState(false);
  let [filterEvent, setFilterEvent] = useState("");
  let [filterTourney, setFilterTourney] = useState("");
  let [filterYear, setFilterYear] = useState(thisYear);

  let [selectedEvents, setSelectedEvents] = useState([]);

  let [filteredEventsList, setFilteredEventsList] = useState([]);
  let [filteredResultsList, setFilteredResoultsList] = useState([]);

  useEffect(() => {
    setFilteredEventsList([
      ...new Set(
        resources.map((e) => e.event).filter((e) => e.includes(filterEvent))
      ),
    ]);
  }, [filterEvent]);

  useEffect(() => {
    setFilteredResoultsList(
      resources.filter(
        (e) =>
          (selectedEvents.length === 0 || selectedEvents.includes(e.event)) &&
          e.tournament.includes(filterTourney) &&
          e.year.includes(filterYear) &&
          (e.type === "scoresheet") === scoresheet
      )
    );
  }, [filterTourney, filterYear, scoresheet, selectedEvents]);

  return (
    <div className="min-h-[200vh] w-screen bg-sky-950 pt-10">
      <div className="w-full bg-blue-500/35 flex flex-row justify-center align-middle items-center">
        <h2 className="font-bold text-[54px] text-white p-10">Tests</h2>
      </div>
      {/*filter bar*/}
      <div className="w-full flex flex-row-reverse p-2 text-gray-300">
        <div className="m-2 flex flex-row gap-2">
          <label for="event-input">Event</label>
          <div>
            <input
              className="rounded-lg bg-white/20"
              id="event-input"
              onInput={(e) => setFilterEvent(e.target.value)}
            />
            <div className="absolute m-1 bg-white/10 rounded-lg max-h-[40%] overflow-auto shadow-lg">
              <div className="shaow-inner flex flex-col">
                {filteredEventsList.map((e) => (
                  <button
                    className="rounded-[5px] border-[1px] m-1 p-1 border-white/25"
                    style={{
                      backgroundColor: selectedEvents.includes(e)
                        ? "rgba(200,200,200,0.3)"
                        : "rgba(0,0,0,0)",
                    }}
                    value={e}
                    onClick={(e) => {
                      let index = selectedEvents.indexOf(e.target.value);
                      if (index < 0)
                        setSelectedEvents([...selectedEvents, e.target.value]);
                      else
                        setSelectedEvents(
                          selectedEvents.filter((c) => c !== e.target.value)
                        );
                    }}
                  >
                    {e}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="m-2 flex flex-row gap-2">
          <label for="tourney-input">Tournament</label>
          <input
            className="rounded-lg bg-white/20"
            id="tourney-input"
            onInput={(e) => setFilterTourney(e.target.value)}
          />
        </div>
        <div className="m-2 flex flex-row gap-2">
          <label for="year-input">Year</label>
          <input
            type="number"
            min="2014"
            max={thisYear}
            step="1"
            value={filterYear}
            className="rounded-lg bg-white/20"
            id="year-input"
            onInput={(e) => setFilterYear(e.target.value)}
          />
        </div>
        <div className="m-2 flex flex-row gap-2">
          <label for="scoresheet-input">
            {scoresheet ? "Scoresheet" : "Test"}
          </label>
          <input
            id="scoresheet-input"
            type="checkbox"
            onChange={() => setScoresheet(!scoresheet)}
          />
        </div>
      </div>
      {/*filter results*/}
      <div className="w-1/2 flex flex-col p-2 text-gray-400 text-left font-sans leading-7">
        {filteredResultsList.map((e) => (
          <div className="group border-[1px] border-white/25 rounded-lg m-2 p-2">
            <h3 className="text-white/80">
              {e.notes && "*"}
              {e.event} - {e.tournament} ({e.year}):{" "}
              {e.link && (
                <Link href={e.link} className="font-bold">
                  link
                </Link>
              )}
              ,{" "}
              {e.key && (
                <Link href={e.key} className="font-bold">
                  key
                </Link>
              )}
            </h3>
            {e.notes && (
              <div className="bg-white/30 p-2 rounded-md text-white hidden group-hover:block">
                {e.notes}
              </div>
            )}
            <div className="leading-5">
              {e.links && (
                <ul className="mx-10 list-disc list-inside">
                  {e.links.map((link, i) => (
                    <li>
                      <Link href={link}>link {i + 1}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
