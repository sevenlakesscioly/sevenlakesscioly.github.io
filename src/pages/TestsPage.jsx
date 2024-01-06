import { useEffect, useState } from "react";
import { resources } from "../resource_tests";
import Link from "../components/Link";
import { FaCloudDownloadAlt } from "react-icons/fa";

function getDownloadFromDrive(link) {
  const last = link.lastIndexOf("/");
  const second_to_last = link.lastIndexOf("/", last - 1);
  return (
    "https://drive.google.com/uc?export=download&id=" +
    link.substring(second_to_last + 1, last)
  );
}

function LinkWithDownload({ href, className, children, ...props }) {
  return (
    <>
      <Link href={href} className={className} {...props}>
        {children}
      </Link>{" "}
      <Link
        className="inline-block"
        href={getDownloadFromDrive(href)}
        {...props}
      >
        <FaCloudDownloadAlt size={14} />
      </Link>
    </>
  );
}

export default function TestsPage(props) {
  let thisYear = new Date().getFullYear();

  let [scoresheet, setScoresheet] = useState(false);
  let [filterEvent, setFilterEvent] = useState("");
  let [filterTourney, setFilterTourney] = useState("");
  let [filterYear, setFilterYear] = useState(thisYear);

  let [selectedEvents, setSelectedEvents] = useState([]);

  let [filteredEventsList, setFilteredEventsList] = useState([]);
  let [filteredResultsList, setFilteredResoultsList] = useState([]);

  let [isDownloading, setDownloading] = useState(false);

  let [completedTests, setCompletedTests] = useState(
    ((store) => (store ? JSON.parse(store) : []))(
      localStorage.getItem("completedTests")
    )
  );

  window.addEventListener("beforeunload", () => {
    localStorage.setItem("completedTests", JSON.stringify(completedTests));
  });

  //filtering events to display
  useEffect(() => {
    let selectedEventsSet = new Set(selectedEvents);
    let sorted = resources
      .sort(
        (a, b) =>
          a.event.localeCompare(b.event) -
          1000 *
            (selectedEventsSet.has(a.event.toUpperCase()) -
              selectedEventsSet.has(b.event.toUpperCase()))
      )
      .reduce((accum, { year: y, event: e }) => {
        let value = e.toUpperCase();
        if (
          (selectedEventsSet.has(value) || y.includes(filterYear)) &&
          (accum.length === 0 ||
            e.toUpperCase() !== accum[accum.length - 1].toUpperCase()) &&
          e.toUpperCase().includes(filterEvent.toUpperCase())
        )
          accum.push(e);
        return accum;
      }, []);
    setFilteredEventsList(sorted);
  }, [filterEvent, filterYear, selectedEvents]);

  //filtering resources to display
  useEffect(() => {
    let to = resources.filter(
      (e) =>
        (selectedEvents.length === 0 ||
          selectedEvents.includes(e.event.toUpperCase())) &&
        e.tournament.includes(filterTourney) &&
        e.year.includes(filterYear) &&
        (e.type === "scoresheet") === scoresheet
    );
    setFilteredResoultsList(to);
  }, [filterTourney, filterYear, scoresheet, selectedEvents]);

  return (
    <div className="min-h-[200vh] w-full bg-sky-950 pt-10">
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
                {filteredEventsList.map((e, i) => (
                  <button
                    key={i}
                    className="rounded-[5px] border-[1px] m-1 p-1 border-white/25"
                    style={{
                      backgroundColor: selectedEvents.includes(e.toUpperCase())
                        ? "rgba(200,200,200,0.3)"
                        : "rgba(0,0,0,0)",
                    }}
                    value={e}
                    onClick={(e) => {
                      let value = e.target.value.toUpperCase();
                      let index = selectedEvents.indexOf(value);
                      if (index < 0)
                        setSelectedEvents([...selectedEvents, value]);
                      else
                        setSelectedEvents(
                          selectedEvents.filter((c) => c !== value)
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
        <div className="m-2">
          <button
            className="bg-white/30 p-1 rounded-md text-sm"
            onClick={() => !isDownloading && setDownloading(true)}
          >
            Download All <sub>experimental</sub>
          </button>
        </div>
        {isDownloading && (
          <div className="hidden">
            {filteredResultsList.map(
              (e, i) =>
                e.link && (
                  <iframe
                    key={i}
                    title={e.link}
                    src={getDownloadFromDrive(e.link)}
                    onLoad={(e) => {
                      console.log(e);
                      console.log(e.target);
                    }}
                  />
                )
            )}
          </div>
        )}
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
        {filteredResultsList.map((e, i) => (
          <ResourceBox
            key={i}
            completed={completedTests.some((t) => testEquals(t, e))}
            setCompleted={(v) =>
              v
                ? setCompletedTests([...completedTests, e])
                : setCompletedTests(
                    completedTests.filter((t) => !testEquals(t, e))
                  )
            }
            data={e}
          />
        ))}
      </div>
    </div>
  );
}

function ResourceBox({ completed, setCompleted, data: e }) {
  return (
    <div className="group border-[1px] border-white/25 rounded-lg m-2 p-2">
      <h3 className="text-white/80">
        <button
          className={
            "text-sm p-1 m-1 rounded-lg " +
            (completed ? "bg-blue-400" : "bg-white/30")
          }
          onClick={() => setCompleted(!completed)}
        >
          {completed ? "Taken" : "Not Taken"}
        </button>
        {e.notes && "*"}
        {e.event} - {e.tournament} ({e.year}):{" "}
        {e.link && (
          <LinkWithDownload href={e.link} className="font-bold">
            link
          </LinkWithDownload>
        )}
        {e.key && (
          <>
            ,{" "}
            <LinkWithDownload href={e.key} className="font-bold">
              key
            </LinkWithDownload>
          </>
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
                <LinkWithDownload href={link}>link {i + 1}</LinkWithDownload>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function testEquals(t, e) {
  return (
    t.event === e.event && t.tournament === e.tournament && t.year === e.year
  );
}
